use crate::config;
use std::fs;
use tauri::{AppHandle, Emitter};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub async fn save_redis_config(app: AppHandle, url: String) -> Result<(), String> {
    let path = config::get_config_path(&app);
    let config = config::AppConfig { redis_url: url };

    // 1. 序列化并保存到文件
    let toml_str = toml::to_string(&config).map_err(|e| e.to_string())?;
    fs::write(path, toml_str).map_err(|e| e.to_string())?;

    // 2. 这里可以触发重连逻辑（例如通过发射事件或重启循环）
    println!("配置已更新为: {}", config.redis_url);

    // 通知其他组件配置已更改（可选）
    app.emit("config-changed", config).unwrap();

    Ok(())
}
