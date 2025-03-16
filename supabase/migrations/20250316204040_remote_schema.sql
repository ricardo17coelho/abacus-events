alter table "public"."event_brand" drop constraint "event_banner_event_id_fkey";

alter table "public"."event_brand" drop constraint "event_banner_pkey";

drop index if exists "public"."event_banner_pkey";

create table "public"."event_attachments" (
    "id" uuid not null default gen_random_uuid(),
    "uploaded_at" timestamp with time zone not null default now(),
    "display_name" text not null,
    "path" text not null,
    "mime_ype" text not null,
    "size" text not null,
    "name" text not null,
    "extension" text not null,
    "event_id" uuid default gen_random_uuid(),
    "url" text not null
);


alter table "public"."event_attachments" enable row level security;

create table "public"."event_brand_banners" (
    "id" uuid not null default gen_random_uuid(),
    "event_brand_id" uuid not null default gen_random_uuid(),
    "event_attachment_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_brand_banners" enable row level security;

alter table "public"."event_brand" drop column "banners";

alter table "public"."event_brand" add column "layout" text;

alter table "public"."events" add column "public" boolean not null default false;

CREATE UNIQUE INDEX event_attachments_pkey ON public.event_attachments USING btree (id);

CREATE UNIQUE INDEX event_brand_banners_pkey ON public.event_brand_banners USING btree (id);

CREATE UNIQUE INDEX event_brand_pkey ON public.event_brand USING btree (event_id);

alter table "public"."event_attachments" add constraint "event_attachments_pkey" PRIMARY KEY using index "event_attachments_pkey";

alter table "public"."event_brand" add constraint "event_brand_pkey" PRIMARY KEY using index "event_brand_pkey";

alter table "public"."event_brand_banners" add constraint "event_brand_banners_pkey" PRIMARY KEY using index "event_brand_banners_pkey";

alter table "public"."event_attachments" add constraint "event_attachments_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_attachments" validate constraint "event_attachments_event_id_fkey";

alter table "public"."event_brand" add constraint "event_brand_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_brand" validate constraint "event_brand_event_id_fkey";

alter table "public"."event_brand_banners" add constraint "event_brand_banners_event_attachment_id_fkey" FOREIGN KEY (event_attachment_id) REFERENCES event_attachments(id) ON DELETE CASCADE not valid;

alter table "public"."event_brand_banners" validate constraint "event_brand_banners_event_attachment_id_fkey";

alter table "public"."event_brand_banners" add constraint "event_brand_banners_event_brand_id_fkey" FOREIGN KEY (event_brand_id) REFERENCES event_brand(event_id) ON DELETE CASCADE not valid;

alter table "public"."event_brand_banners" validate constraint "event_brand_banners_event_brand_id_fkey";

grant delete on table "public"."event_attachments" to "anon";

grant insert on table "public"."event_attachments" to "anon";

grant references on table "public"."event_attachments" to "anon";

grant select on table "public"."event_attachments" to "anon";

grant trigger on table "public"."event_attachments" to "anon";

grant truncate on table "public"."event_attachments" to "anon";

grant update on table "public"."event_attachments" to "anon";

grant delete on table "public"."event_attachments" to "authenticated";

grant insert on table "public"."event_attachments" to "authenticated";

grant references on table "public"."event_attachments" to "authenticated";

grant select on table "public"."event_attachments" to "authenticated";

grant trigger on table "public"."event_attachments" to "authenticated";

grant truncate on table "public"."event_attachments" to "authenticated";

grant update on table "public"."event_attachments" to "authenticated";

grant delete on table "public"."event_attachments" to "service_role";

grant insert on table "public"."event_attachments" to "service_role";

grant references on table "public"."event_attachments" to "service_role";

grant select on table "public"."event_attachments" to "service_role";

grant trigger on table "public"."event_attachments" to "service_role";

grant truncate on table "public"."event_attachments" to "service_role";

grant update on table "public"."event_attachments" to "service_role";

grant delete on table "public"."event_brand_banners" to "anon";

grant insert on table "public"."event_brand_banners" to "anon";

grant references on table "public"."event_brand_banners" to "anon";

grant select on table "public"."event_brand_banners" to "anon";

grant trigger on table "public"."event_brand_banners" to "anon";

grant truncate on table "public"."event_brand_banners" to "anon";

grant update on table "public"."event_brand_banners" to "anon";

grant delete on table "public"."event_brand_banners" to "authenticated";

grant insert on table "public"."event_brand_banners" to "authenticated";

grant references on table "public"."event_brand_banners" to "authenticated";

grant select on table "public"."event_brand_banners" to "authenticated";

grant trigger on table "public"."event_brand_banners" to "authenticated";

grant truncate on table "public"."event_brand_banners" to "authenticated";

grant update on table "public"."event_brand_banners" to "authenticated";

grant delete on table "public"."event_brand_banners" to "service_role";

grant insert on table "public"."event_brand_banners" to "service_role";

grant references on table "public"."event_brand_banners" to "service_role";

grant select on table "public"."event_brand_banners" to "service_role";

grant trigger on table "public"."event_brand_banners" to "service_role";

grant truncate on table "public"."event_brand_banners" to "service_role";

grant update on table "public"."event_brand_banners" to "service_role";

create policy "Admin can delete"
on "public"."event_attachments"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_attachments"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_attachments"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_attachments"
as permissive
for select
to public
using (true);


create policy "Admin can delete"
on "public"."event_brand_banners"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_brand_banners"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_brand_banners"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_brand_banners"
as permissive
for select
to public
using (true);



