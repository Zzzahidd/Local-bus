"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white font-sans">
      <h2 className="text-xl font-semibold mb-3">একটা সমস্যা দেখা দিয়েছে</h2>
      <button
        onClick={() => reset()}
        className="px-5 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
      >
        পুনরায় চেষ্টা করুন
      </button>
    </div>
  );
}
