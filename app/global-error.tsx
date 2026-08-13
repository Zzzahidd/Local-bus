"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bn">
      <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-6 font-sans">
        <h2 className="text-2xl font-bold mb-4">কিছু একটা সমস্যা হয়েছে।</h2>
        <p className="text-white/70 mb-6 text-center max-w-md">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
        >
          আবার চেষ্টা করুন
        </button>
      </body>
    </html>
  );
}
