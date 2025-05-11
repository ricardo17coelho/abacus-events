

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."alert_types" AS ENUM (
    'warning',
    'info',
    'error',
    'success'
);


ALTER TYPE "public"."alert_types" OWNER TO "postgres";


CREATE TYPE "public"."event_features_type" AS ENUM (
    'PARKING',
    'PROGRAM',
    'GUEST_LIST',
    'SHUTTLE_PLAN',
    'CONTACTS',
    'FILES'
);


ALTER TYPE "public"."event_features_type" OWNER TO "postgres";


CREATE TYPE "public"."invitation_status" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'DECLINED'
);


ALTER TYPE "public"."invitation_status" OWNER TO "postgres";


CREATE TYPE "public"."permissions" AS ENUM (
    'EVENT_MNG',
    'EVENT_UPDATE',
    'EVENT_PARKING_LOT_UPDATE',
    'EVENT_USERS_MNG',
    'EVENT_USERS_VIEW',
    'EVENT_USERS_CREATE',
    'EVENT_USERS_UPDATE',
    'EVENT_USERS_DELETE',
    'EVENT_BRANDING_MNG',
    'EVENT_BRANDING_UPDATE',
    'EVENT_BRANDING_DELETE',
    'EVENT_DELETE',
    'EVENT_BRANDING_CREATE',
    'EVENT_CONTACTS_MNG',
    'EVENT_CONTACTS_CREATE',
    'EVENT_CONTACTS_UPDATE',
    'EVENT_CONTACTS_DELETE',
    'EVENT_PARKING_LOT_MNG',
    'EVENT_PARKING_LOT_CREATE',
    'EVENT_PARKING_LOT_DELETE',
    'EVENT_PARKING_LOT_COUNT_UPDATE',
    'EVENT_PROGRAM_MNG',
    'EVENT_PROGRAM_CREATE',
    'EVENT_PROGRAM_UPDATE',
    'EVENT_PROGRAM_DELETE',
    'EVENT_GUEST_LIST_MNG',
    'EVENT_GUEST_LIST_VIEW',
    'EVENT_GUEST_LIST_UPDATE',
    'EVENT_GUEST_LIST_DELETE',
    'EVENT_ATTACHMENTS_MNG',
    'EVENT_ATTACHMENTS_CREATE',
    'EVENT_ATTACHMENTS_UPDATE',
    'EVENT_ATTACHMENTS_DELETE',
    'EVENT_SHUTTLE_PLAN_MNG',
    'EVENT_SHUTTLE_PLAN_CREATE',
    'EVENT_SHUTTLE_PLAN_UPDATE',
    'EVENT_SHUTTLE_PLAN_DELETE',
    'EVENT_FILES_MNG',
    'EVENT_FILES_CREATE',
    'EVENT_FILES_UPDATE',
    'EVENT_FILES_DELETE'
);


ALTER TYPE "public"."permissions" OWNER TO "postgres";


CREATE TYPE "public"."shuttle_plan_directions" AS ENUM (
    'OUTWARD',
    'RETURN'
);


ALTER TYPE "public"."shuttle_plan_directions" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE
        update auth.users set raw_app_meta_data =
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$$;


ALTER FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;


ALTER FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_claims"("uid" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;


ALTER FUNCTION "public"."get_claims"("uid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_my_claim"("claim" "text") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$$;


ALTER FUNCTION "public"."get_my_claim"("claim" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_my_claims"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$$;


ALTER FUNCTION "public"."get_my_claims"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_claims_admin"() RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF;
      If current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role' THEN
        RETURN true; -- service role users have admin rights
      END IF;
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;


ALTER FUNCTION "public"."is_claims_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE
        update auth.users set raw_app_meta_data =
          raw_app_meta_data ||
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$$;


ALTER FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."event_attachments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "uploaded_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "display_name" "text" NOT NULL,
    "path" "text" NOT NULL,
    "size" "text" NOT NULL,
    "name" "text" NOT NULL,
    "extension" "text" NOT NULL,
    "event_id" "uuid" DEFAULT "gen_random_uuid"(),
    "url" "text" NOT NULL,
    "mime_type" "text" NOT NULL
);


ALTER TABLE "public"."event_attachments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_brand" (
    "event_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "color_primary" "text",
    "color_secondary" "text",
    "logo" "text",
    "layout" "text"
);


ALTER TABLE "public"."event_brand" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_brand_banners" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_brand_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_attachment_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."event_brand_banners" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_contacts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "text" NOT NULL,
    "value" "text" NOT NULL,
    "description" "text" NOT NULL,
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."event_contacts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_features" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "title" "json",
    "description" "json",
    "icon" "text",
    "enabled" boolean NOT NULL,
    "feature_id" "public"."event_features_type" NOT NULL
);


ALTER TABLE "public"."event_features" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_files" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_attachment_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order" smallint
);


ALTER TABLE "public"."event_files" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_invitations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text" NOT NULL,
    "message" "text",
    "status" "public"."invitation_status" DEFAULT 'PENDING'::"public"."invitation_status" NOT NULL,
    "role_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL
);


ALTER TABLE "public"."event_invitations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_parking_lots" (
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "parking_lot_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."event_parking_lots" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_persons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "avatar_url" "text",
    "bio" "json",
    "description" "json",
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."event_persons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_shuttle_plan" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "direction" "public"."shuttle_plan_directions" NOT NULL,
    "location" "text" NOT NULL,
    "location_link" "text" NOT NULL,
    "order" smallint NOT NULL,
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."event_shuttle_plan" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_shuttle_plan_alerts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "public"."alert_types",
    "icon" "text",
    "message" "json" NOT NULL,
    "title" "json"
);


ALTER TABLE "public"."event_shuttle_plan_alerts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_timeline" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "json" NOT NULL,
    "locations" "jsonb" DEFAULT '[]'::"jsonb",
    "time_start" "text",
    "time_end" "text",
    "note" "json",
    "icon" "text",
    "event_id" "uuid" NOT NULL,
    "category" "uuid" NOT NULL
);


ALTER TABLE "public"."event_timeline" OWNER TO "postgres";


COMMENT ON TABLE "public"."event_timeline" IS 'Event program timeline';



CREATE TABLE IF NOT EXISTS "public"."event_timeline_category" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "json" NOT NULL,
    "color" "text",
    "event_id" "uuid" NOT NULL,
    "icon" "text"
);


ALTER TABLE "public"."event_timeline_category" OWNER TO "postgres";


COMMENT ON TABLE "public"."event_timeline_category" IS 'Event Program timeline category';



CREATE TABLE IF NOT EXISTS "public"."event_timeline_persons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "event_person_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_timeline_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."event_timeline_persons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_users" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL
);


ALTER TABLE "public"."event_users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "json" NOT NULL,
    "description" "json",
    "date" "date" NOT NULL,
    "slug" "text",
    "public" boolean DEFAULT false NOT NULL,
    "subtitle" "json"
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."parking_lots" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "json" NOT NULL,
    "location" "text",
    "location_url" "text",
    "total_slots" smallint NOT NULL,
    "filled_slots" smallint
);


ALTER TABLE "public"."parking_lots" OWNER TO "postgres";


COMMENT ON TABLE "public"."parking_lots" IS 'Parking lots for the event';



CREATE TABLE IF NOT EXISTS "public"."profile_settings" (
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "openai_api_key_encrypted" "text"
);


ALTER TABLE "public"."profile_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "first_name" "text",
    "last_name" "text",
    "avatar_url" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "permissions" "public"."permissions"[] NOT NULL,
    "title" "json" NOT NULL
);


ALTER TABLE "public"."roles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."event_attachments"
    ADD CONSTRAINT "event_attachments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_brand_banners"
    ADD CONSTRAINT "event_brand_banners_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_brand"
    ADD CONSTRAINT "event_brand_pkey" PRIMARY KEY ("event_id");



ALTER TABLE ONLY "public"."event_contacts"
    ADD CONSTRAINT "event_contacts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_features"
    ADD CONSTRAINT "event_features_2_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_files"
    ADD CONSTRAINT "event_files_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_parking_lots"
    ADD CONSTRAINT "event_parking_lots_pkey" PRIMARY KEY ("event_id", "parking_lot_id");



ALTER TABLE ONLY "public"."event_persons"
    ADD CONSTRAINT "event_persons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "event_roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_shuttle_plan_alerts"
    ADD CONSTRAINT "event_shuttle_plan_alerts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_shuttle_plan"
    ADD CONSTRAINT "event_shuttle_plan_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_timeline_persons"
    ADD CONSTRAINT "event_timeline_persons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_users"
    ADD CONSTRAINT "event_users_pkey" PRIMARY KEY ("user_id", "role_id", "event_id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."event_invitations"
    ADD CONSTRAINT "invitations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."parking_lots"
    ADD CONSTRAINT "parking_lots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profile_settings"
    ADD CONSTRAINT "profile_settings_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_timeline_category"
    ADD CONSTRAINT "program_timeline_category_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_timeline"
    ADD CONSTRAINT "program_timeline_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_attachments"
    ADD CONSTRAINT "event_attachments_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_brand_banners"
    ADD CONSTRAINT "event_brand_banners_event_attachment_id_fkey" FOREIGN KEY ("event_attachment_id") REFERENCES "public"."event_attachments"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_brand_banners"
    ADD CONSTRAINT "event_brand_banners_event_brand_id_fkey" FOREIGN KEY ("event_brand_id") REFERENCES "public"."event_brand"("event_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_brand"
    ADD CONSTRAINT "event_brand_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_contacts"
    ADD CONSTRAINT "event_contacts_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_features"
    ADD CONSTRAINT "event_features_2_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_files"
    ADD CONSTRAINT "event_files_event_attachment_id_fkey" FOREIGN KEY ("event_attachment_id") REFERENCES "public"."event_attachments"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_files"
    ADD CONSTRAINT "event_files_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_parking_lots"
    ADD CONSTRAINT "event_parking_lots_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_parking_lots"
    ADD CONSTRAINT "event_parking_lots_parking_lot_id_fkey" FOREIGN KEY ("parking_lot_id") REFERENCES "public"."parking_lots"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_persons"
    ADD CONSTRAINT "event_persons_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_shuttle_plan_alerts"
    ADD CONSTRAINT "event_shuttle_plan_alerts_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_shuttle_plan"
    ADD CONSTRAINT "event_shuttle_plan_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_timeline_category"
    ADD CONSTRAINT "event_timeline_category_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_timeline"
    ADD CONSTRAINT "event_timeline_category_id_fkey" FOREIGN KEY ("category") REFERENCES "public"."event_timeline_category"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_timeline"
    ADD CONSTRAINT "event_timeline_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_timeline_persons"
    ADD CONSTRAINT "event_timeline_persons_event_person_id_fkey" FOREIGN KEY ("event_person_id") REFERENCES "public"."event_persons"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_timeline_persons"
    ADD CONSTRAINT "event_timeline_persons_event_timeline_id_fkey" FOREIGN KEY ("event_timeline_id") REFERENCES "public"."event_timeline"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_users"
    ADD CONSTRAINT "event_users_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_users"
    ADD CONSTRAINT "event_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_users"
    ADD CONSTRAINT "event_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_invitations"
    ADD CONSTRAINT "invitations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."event_invitations"
    ADD CONSTRAINT "invitations_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_settings"
    ADD CONSTRAINT "profile_settings_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



CREATE POLICY "Admin can add" ON "public"."parking_lots" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text"))));



CREATE POLICY "Admin can create" ON "public"."events" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text"))));



CREATE POLICY "Admin can delete" ON "public"."event_attachments" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_brand" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_brand_banners" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_contacts" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_features" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_files" FOR DELETE USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_invitations" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_parking_lots" FOR DELETE USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_persons" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_shuttle_plan" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_shuttle_plan_alerts" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_timeline" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_timeline_category" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_timeline_persons" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."event_users" FOR DELETE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can delete" ON "public"."events" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text"))));



CREATE POLICY "Admin can delete" ON "public"."parking_lots" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text"))));



CREATE POLICY "Admin can delete" ON "public"."roles" FOR DELETE USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_attachments" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_brand" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_brand_banners" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_contacts" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_features" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_files" FOR INSERT WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_invitations" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_parking_lots" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_persons" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_shuttle_plan" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_shuttle_plan_alerts" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_timeline" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_timeline_category" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_timeline_persons" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."event_users" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can insert" ON "public"."roles" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb"));



CREATE POLICY "Admin can update" ON "public"."event_attachments" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_brand" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_brand_banners" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_contacts" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_features" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_files" FOR UPDATE USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_invitations" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_parking_lots" FOR UPDATE USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_persons" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_shuttle_plan" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_shuttle_plan_alerts" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_timeline" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_timeline_category" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_timeline_persons" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."event_users" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."events" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text")))) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."parking_lots" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text")))) WITH CHECK (true);



CREATE POLICY "Admin can update" ON "public"."roles" FOR UPDATE TO "authenticated" USING (("public"."get_my_claim"('userroles'::"text") @> '["ADMIN"]'::"jsonb")) WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_attachments" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_brand" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_brand_banners" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_contacts" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_features" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_files" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_invitations" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_parking_lots" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_persons" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_shuttle_plan" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_shuttle_plan_alerts" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_timeline" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_timeline_category" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_timeline_persons" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."event_users" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."events" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."parking_lots" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."roles" FOR SELECT USING (true);



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."event_attachments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_brand" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_brand_banners" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_contacts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_features" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_files" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_invitations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_parking_lots" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_persons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_shuttle_plan" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_shuttle_plan_alerts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_timeline" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_timeline_category" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_timeline_persons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."event_users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."parking_lots" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "service_role";


















GRANT ALL ON TABLE "public"."event_attachments" TO "anon";
GRANT ALL ON TABLE "public"."event_attachments" TO "authenticated";
GRANT ALL ON TABLE "public"."event_attachments" TO "service_role";



GRANT ALL ON TABLE "public"."event_brand" TO "anon";
GRANT ALL ON TABLE "public"."event_brand" TO "authenticated";
GRANT ALL ON TABLE "public"."event_brand" TO "service_role";



GRANT ALL ON TABLE "public"."event_brand_banners" TO "anon";
GRANT ALL ON TABLE "public"."event_brand_banners" TO "authenticated";
GRANT ALL ON TABLE "public"."event_brand_banners" TO "service_role";



GRANT ALL ON TABLE "public"."event_contacts" TO "anon";
GRANT ALL ON TABLE "public"."event_contacts" TO "authenticated";
GRANT ALL ON TABLE "public"."event_contacts" TO "service_role";



GRANT ALL ON TABLE "public"."event_features" TO "anon";
GRANT ALL ON TABLE "public"."event_features" TO "authenticated";
GRANT ALL ON TABLE "public"."event_features" TO "service_role";



GRANT ALL ON TABLE "public"."event_files" TO "anon";
GRANT ALL ON TABLE "public"."event_files" TO "authenticated";
GRANT ALL ON TABLE "public"."event_files" TO "service_role";



GRANT ALL ON TABLE "public"."event_invitations" TO "anon";
GRANT ALL ON TABLE "public"."event_invitations" TO "authenticated";
GRANT ALL ON TABLE "public"."event_invitations" TO "service_role";



GRANT ALL ON TABLE "public"."event_parking_lots" TO "anon";
GRANT ALL ON TABLE "public"."event_parking_lots" TO "authenticated";
GRANT ALL ON TABLE "public"."event_parking_lots" TO "service_role";



GRANT ALL ON TABLE "public"."event_persons" TO "anon";
GRANT ALL ON TABLE "public"."event_persons" TO "authenticated";
GRANT ALL ON TABLE "public"."event_persons" TO "service_role";



GRANT ALL ON TABLE "public"."event_shuttle_plan" TO "anon";
GRANT ALL ON TABLE "public"."event_shuttle_plan" TO "authenticated";
GRANT ALL ON TABLE "public"."event_shuttle_plan" TO "service_role";



GRANT ALL ON TABLE "public"."event_shuttle_plan_alerts" TO "anon";
GRANT ALL ON TABLE "public"."event_shuttle_plan_alerts" TO "authenticated";
GRANT ALL ON TABLE "public"."event_shuttle_plan_alerts" TO "service_role";



GRANT ALL ON TABLE "public"."event_timeline" TO "anon";
GRANT ALL ON TABLE "public"."event_timeline" TO "authenticated";
GRANT ALL ON TABLE "public"."event_timeline" TO "service_role";



GRANT ALL ON TABLE "public"."event_timeline_category" TO "anon";
GRANT ALL ON TABLE "public"."event_timeline_category" TO "authenticated";
GRANT ALL ON TABLE "public"."event_timeline_category" TO "service_role";



GRANT ALL ON TABLE "public"."event_timeline_persons" TO "anon";
GRANT ALL ON TABLE "public"."event_timeline_persons" TO "authenticated";
GRANT ALL ON TABLE "public"."event_timeline_persons" TO "service_role";



GRANT ALL ON TABLE "public"."event_users" TO "anon";
GRANT ALL ON TABLE "public"."event_users" TO "authenticated";
GRANT ALL ON TABLE "public"."event_users" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."parking_lots" TO "anon";
GRANT ALL ON TABLE "public"."parking_lots" TO "authenticated";
GRANT ALL ON TABLE "public"."parking_lots" TO "service_role";



GRANT ALL ON TABLE "public"."profile_settings" TO "anon";
GRANT ALL ON TABLE "public"."profile_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."profile_settings" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;

--
-- Dumped schema changes for auth and storage
--

CREATE POLICY "Only ADMIN can access event storage" ON "storage"."objects" USING ((("bucket_id" = 'events'::"text") AND ("name" ~~ '%/%'::"text") AND (EXISTS ( SELECT 1
   FROM "jsonb_array_elements_text"("public"."get_my_claim"('userroles'::"text")) "role"("value")
  WHERE ("role"."value" = 'ADMIN'::"text")))));



