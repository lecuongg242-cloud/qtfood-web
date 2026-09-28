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
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — QT FOOD Admin" },
  },
  i18n: {
    supportedLanguages: { vi },
    fallbackLanguage: "vi",
  },
  collections: [Products, ProductCategories, Leads, Stores, Media, Users],
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
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Giữ schema cố định dù Blob đang bật hay tắt (không phải tạo migration khi gắn Blob)
      alwaysInsertFields: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
