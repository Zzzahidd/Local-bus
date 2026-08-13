import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white text-center font-sans">
      <h2 className="text-3xl font-bold mb-2">404</h2>
      <p className="text-white/70 mb-6">এই পৃষ্ঠাটি পাওয়া যায়নি।</p>
      <Link
        href="/"
        className="px-6 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
      >
        মূল পাতায় ফিরে যান
      </Link>
    </div>
  );
}
