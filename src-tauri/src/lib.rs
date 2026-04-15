use std::sync::Mutex;

use crate::redis_handler::{start_redis_loop, RedisState};

mod commands;
mod config;
mod redis_handler;
mod setup;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(RedisState {
            is_connected: Mutex::new(false),
        })
        .setup(|app| {
            // 设置系统托盘图标
            setup::tray_setup(app)?;
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let _ = start_redis_loop(handle).await;
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::save_redis_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
