import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "certifications_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"standard" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"number" varchar NOT NULL,
  	"issuer" varchar NOT NULL,
  	"holder" varchar NOT NULL,
  	"decision" varchar,
  	"scope" varchar NOT NULL,
  	"location" varchar,
  	"issued_at" timestamp(3) with time zone NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"surveillance" varchar,
  	"active" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "_products_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certifications_id" integer;
  ALTER TABLE "certifications_documents" ADD CONSTRAINT "certifications_documents_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_documents" ADD CONSTRAINT "certifications_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "certifications_documents_order_idx" ON "certifications_documents" USING btree ("_order");
  CREATE INDEX "certifications_documents_parent_id_idx" ON "certifications_documents" USING btree ("_parent_id");
  CREATE INDEX "certifications_documents_image_idx" ON "certifications_documents" USING btree ("image_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certifications_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "certifications_documents" CASCADE;
  DROP TABLE "certifications" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certifications_fk";
  
  DROP INDEX "_products_v_autosave_idx";
  DROP INDEX "_posts_v_autosave_idx";
  DROP INDEX "payload_locked_documents_rels_certifications_id_idx";
  ALTER TABLE "_products_v" DROP COLUMN "autosave";
  ALTER TABLE "_posts_v" DROP COLUMN "autosave";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certifications_id";`)
}
