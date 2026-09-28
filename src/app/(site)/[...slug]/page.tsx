import { notFound } from "next/navigation";

// Mọi đường dẫn chưa có trang → not-found.tsx của (site), vẫn giữ header/footer.
// /admin và /api (Payload) là đoạn tĩnh nên được ưu tiên hơn route này.
export default function CatchAll() {
  notFound();
}
