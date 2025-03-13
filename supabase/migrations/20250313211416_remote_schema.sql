create type "public"."event_features_type" as enum ('PARKING', 'PROGRAM', 'GUEST_LIST', 'SHUTTLE_PLAN', 'CONTACTS', 'ATTACHMENTS');

drop policy "Claim Admin: can insert" on "public"."event_timeline";

drop policy "Claim Admin: can update" on "public"."event_timeline";

create table "public"."event_brand" (
    "event_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "color_primary" text,
    "color_secondary" text,
    "banners" jsonb[],
    "logo" text
);


alter table "public"."event_brand" enable row level security;

create table "public"."event_features" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "event_id" uuid not null,
    "title" json,
    "description" json,
    "icon" text,
    "enabled" boolean not null,
    "feature_id" event_features_type not null
);


alter table "public"."event_features" enable row level security;

alter table "public"."events" drop column "banner";

CREATE UNIQUE INDEX event_banner_pkey ON public.event_brand USING btree (event_id);

CREATE UNIQUE INDEX event_features_2_pkey ON public.event_features USING btree (id);

alter table "public"."event_brand" add constraint "event_banner_pkey" PRIMARY KEY using index "event_banner_pkey";

alter table "public"."event_features" add constraint "event_features_2_pkey" PRIMARY KEY using index "event_features_2_pkey";

alter table "public"."event_brand" add constraint "event_banner_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_brand" validate constraint "event_banner_event_id_fkey";

alter table "public"."event_features" add constraint "event_features_2_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_features" validate constraint "event_features_2_event_id_fkey";

grant delete on table "public"."event_brand" to "anon";

grant insert on table "public"."event_brand" to "anon";

grant references on table "public"."event_brand" to "anon";

grant select on table "public"."event_brand" to "anon";

grant trigger on table "public"."event_brand" to "anon";

grant truncate on table "public"."event_brand" to "anon";

grant update on table "public"."event_brand" to "anon";

grant delete on table "public"."event_brand" to "authenticated";

grant insert on table "public"."event_brand" to "authenticated";

grant references on table "public"."event_brand" to "authenticated";

grant select on table "public"."event_brand" to "authenticated";

grant trigger on table "public"."event_brand" to "authenticated";

grant truncate on table "public"."event_brand" to "authenticated";

grant update on table "public"."event_brand" to "authenticated";

grant delete on table "public"."event_brand" to "service_role";

grant insert on table "public"."event_brand" to "service_role";

grant references on table "public"."event_brand" to "service_role";

grant select on table "public"."event_brand" to "service_role";

grant trigger on table "public"."event_brand" to "service_role";

grant truncate on table "public"."event_brand" to "service_role";

grant update on table "public"."event_brand" to "service_role";

grant delete on table "public"."event_features" to "anon";

grant insert on table "public"."event_features" to "anon";

grant references on table "public"."event_features" to "anon";

grant select on table "public"."event_features" to "anon";

grant trigger on table "public"."event_features" to "anon";

grant truncate on table "public"."event_features" to "anon";

grant update on table "public"."event_features" to "anon";

grant delete on table "public"."event_features" to "authenticated";

grant insert on table "public"."event_features" to "authenticated";

grant references on table "public"."event_features" to "authenticated";

grant select on table "public"."event_features" to "authenticated";

grant trigger on table "public"."event_features" to "authenticated";

grant truncate on table "public"."event_features" to "authenticated";

grant update on table "public"."event_features" to "authenticated";

grant delete on table "public"."event_features" to "service_role";

grant insert on table "public"."event_features" to "service_role";

grant references on table "public"."event_features" to "service_role";

grant select on table "public"."event_features" to "service_role";

grant trigger on table "public"."event_features" to "service_role";

grant truncate on table "public"."event_features" to "service_role";

grant update on table "public"."event_features" to "service_role";

create policy "Admin can delete"
on "public"."event_brand"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_brand"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_brand"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_brand"
as permissive
for select
to public
using (true);


create policy "Admin can delete"
on "public"."event_features"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_features"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_features"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_features"
as permissive
for select
to public
using (true);


create policy "Admin can delete"
on "public"."event_parking_lots"
as permissive
for delete
to public
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_parking_lots"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_parking_lots"
as permissive
for update
to public
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Admin can delete"
on "public"."event_roles"
as permissive
for delete
to public
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_roles"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_roles"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Admin can delete"
on "public"."event_timeline"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_timeline"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_timeline"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Admin can delete"
on "public"."event_timeline_category"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_timeline_category"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_timeline_category"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Admin can delete"
on "public"."event_users"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_users"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_users"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Admin can delete"
on "public"."invitations"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."invitations"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."invitations"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);



