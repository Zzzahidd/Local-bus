"use client";

import { useState, useEffect } from "react";

export function usePresence() {
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  useEffect(() => {
    // Function to send heartbeat to server
    const sendHeartbeat = async () => {
      try {
        await fetch("/api/presence", { method: "POST" });
      } catch (err) {
        console.error("Presence heartbeat error:", err);
      }
    };

    // Function to fetch current online count
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/presence/count");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.online === "number") {
            setOnlineCount(data.online);
          } else {
            setOnlineCount(null);
          }
        }
      } catch (err) {
        console.error("Presence count error:", err);
        setOnlineCount(null);
      }
    };

    // Initial sequence
    sendHeartbeat().then(() => fetchCount());

    // Heartbeat interval (~30s)
    const heartbeatInterval = setInterval(sendHeartbeat, 30000);

    // Count polling interval (~20s)
    const countInterval = setInterval(fetchCount, 20000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(countInterval);
    };
  }, []);

  return onlineCount;
}
