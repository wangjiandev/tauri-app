use crate::config;
use redis::{Client, Connection, ConnectionLike, RedisResult};
use std::{sync::Mutex, time::Duration};
use tauri::{AppHandle, Emitter, Manager};
use tokio::time::sleep;

#[derive(Clone, serde::Serialize)]
pub struct StatusPayload {
    pub connected: bool,
    pub latency: String,
}

pub struct RedisState {
    pub is_connected: Mutex<bool>,
}

pub async fn start_redis_loop(app: AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let config = config::load_config(&app);
    let client = Client::open(config.redis_url).unwrap();
    let state = app.state::<RedisState>();
    loop {
        let connection = client.get_connection();
        match connection {
            Ok(mut conn) => {
                // 成功连接
                *state.is_connected.lock().unwrap() = true;
                update_server_status(&app, true, "".to_string());
                while let Ok(()) = send_heartbeat(&mut conn, &app) {
                    sleep(Duration::from_secs(60)).await;
                }
                // 运行到这里说明 Ping 失败，连接断开
                *state.is_connected.lock().unwrap() = false;
                update_server_status(&app, false, "未连接".to_string());
            }
            Err(_) => {
                // 连接失败，尝试重连
                update_server_status(&app, false, "重试".to_string());
                sleep(Duration::from_secs(5)).await;
            }
        }
    }
}

fn send_heartbeat(conn: &mut Connection, app: &AppHandle) -> RedisResult<()> {
    let start = std::time::Instant::now();
    let _pong = conn.req_command(&redis::Cmd::new().arg("PING"))?;
    let duration = start.elapsed().as_millis();

    let latency = format!("{}ms", duration);
    update_server_status(app, true, latency);
    Ok(())
}

fn update_server_status(app: &AppHandle, connected: bool, latency: String) {
    println!("Sending status update: {} {}", connected, latency);
    if let Err(e) = app.emit(
        "redis-status",
        StatusPayload {
            connected,
            latency: latency.clone(),
        },
    ) {
        eprintln!("Failed to emit redis status: {}", e);
    }
}
