use serde::{Deserialize, Serialize};
use std::fs;
use tauri::{AppHandle, Manager};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AppConfig {
    pub redis_url: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            redis_url: "redis://127.0.0.1:6379".to_string(),
        }
    }
}

pub fn get_config_path(app: &AppHandle) -> std::path::PathBuf {
    let config_dir = app.path().app_config_dir().expect("无法获取配置目录");
    // 确保目录存在
    let _ = fs::create_dir_all(&config_dir);
    config_dir.join("config.toml")
}

// 加载配置：如果文件不存在则返回默认值
pub fn load_config(app: &AppHandle) -> AppConfig {
    let path = get_config_path(app);
    if path.exists() {
        let content = fs::read_to_string(path).unwrap_or_default();
        toml::from_str(&content).unwrap_or_else(|_| AppConfig::default())
    } else {
        AppConfig::default()
    }
}
