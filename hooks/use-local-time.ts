"use client";

import { useState, useEffect } from "react";

export function useLocalTime() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as h:mm a (e.g. 9:27 pm or 11:27 pm)
      const formatter = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Format time string nicely, matching saloon.wtf clean style
      const formatted = formatter.format(now).toLowerCase();
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeString;
}
