import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/** Bật Draft Mode để xem bản nháp — chỉ cho người đã đăng nhập admin. Gọi từ Live Preview: /next/preview?path=/tin-tuc/abc */
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "";
  // Chỉ chuyển hướng trong site (chặn open redirect kiểu "//evil.com")
  if (!path.startsWith("/") || path.startsWith("//")) return new Response("Đường dẫn không hợp lệ", { status: 400 });

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) return new Response("Vui lòng đăng nhập trang quản trị để xem bản nháp.", { status: 403 });

  (await draftMode()).enable();
  redirect(path);
}
