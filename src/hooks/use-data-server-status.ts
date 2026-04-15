import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";

export interface DataServerStatus {
  connected: boolean;
  latency: string;
}

export const useDataServerStatus = () => {
  const [status, setStatus] = useState<DataServerStatus>({
    connected: false,
    latency: "0ms",
  });
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const response = await invoke<{ connected: boolean; latency: string }>(
          "get_redis_status",
        );
        setStatus(response);
      } catch (error) {
        console.error("获取初始状态失败:", error);
      }
    };

    fetchInitialStatus();

    const unlisten = listen<DataServerStatus>("redis-status", (event) => {
      setStatus(event.payload);
      setIsListening(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return { status, isListening };
};
