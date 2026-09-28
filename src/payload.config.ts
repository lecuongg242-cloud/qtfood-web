import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { vi } from "@payloadcms/translations/languages/vi";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { ProductCategories } from "./payload/collections/ProductCategories";
import { Products } from "./payload/collections/Products";
import { Leads } from "./payload/collections/Leads";
import { Stores } from "./payload/collections/Stores";
import { Posts } from "./payload/collections/Posts";
import { Policies } from "./payload/collections/Policies";
import { Certifications } from "./payload/collections/Certifications";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { livePreview } from "./payload/live-preview";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — QT FOOD Admin" },
    components: { beforeDashboard: ["/payload/components/AdminDashboard#AdminDashboard"] },
    livePreview,
  },
  i18n: {
    supportedLanguages: { vi },
    fallbackLanguage: "vi",
  },
  collections: [Products, ProductCategories, Leads, Posts, Policies, Stores, Certifications, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // Chỉ có 1 DB dùng chung → luôn đổi schema bằng migration, không để Payload tự "push"
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  // Giới hạn tệp tải lên 15MB (ảnh được thu nhỏ khi lưu — xem Media)
  upload: { limits: { fileSize: 15_000_000 } },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Giữ schema cố định dù Blob đang bật hay tắt (không phải tạo migration khi gắn Blob)
      alwaysInsertFields: true,
      // Tải thẳng từ trình duyệt lên Blob → vượt giới hạn 4,5MB mỗi request của Vercel
      clientUploads: true,
      // Ảnh công khai → trả link CDN của Blob trực tiếp (không đi qua server), gom vào thư mục media/
      collections: { media: { disablePayloadAccessControl: true, prefix: "media" } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
