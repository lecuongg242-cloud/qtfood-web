import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "products" ADD COLUMN "iso_badge" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_iso_badge" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "products" DROP COLUMN "iso_badge";
  ALTER TABLE "_products_v" DROP COLUMN "version_iso_badge";`)
}
