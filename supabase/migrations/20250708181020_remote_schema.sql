create table "public"."event_timeline_locations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" json not null,
    "img_url" text,
    "event_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_timeline_locations" enable row level security;

create table "public"."event_timeline_locations_map" (
    "id" uuid not null default gen_random_uuid(),
    "event_timeline_id" uuid not null,
    "event_timeline_location_id" uuid not null
);


alter table "public"."event_timeline_locations_map" enable row level security;

alter table "public"."event_features" add column "order" smallint;

alter table "public"."event_files" add column "visible" boolean default false;

alter table "public"."event_timeline" drop column "locations";

CREATE UNIQUE INDEX event_timeline_locations_map_pkey ON public.event_timeline_locations_map USING btree (event_timeline_id, event_timeline_location_id);

CREATE UNIQUE INDEX event_timeline_locations_pkey ON public.event_timeline_locations USING btree (id);

alter table "public"."event_timeline_locations" add constraint "event_timeline_locations_pkey" PRIMARY KEY using index "event_timeline_locations_pkey";

alter table "public"."event_timeline_locations_map" add constraint "event_timeline_locations_map_pkey" PRIMARY KEY using index "event_timeline_locations_map_pkey";

alter table "public"."event_timeline_locations" add constraint "event_timeline_locations_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_timeline_locations" validate constraint "event_timeline_locations_event_id_fkey";

alter table "public"."event_timeline_locations_map" add constraint "event_timeline_locations_map_event_timeline_id_fkey" FOREIGN KEY (event_timeline_id) REFERENCES event_timeline(id) not valid;

alter table "public"."event_timeline_locations_map" validate constraint "event_timeline_locations_map_event_timeline_id_fkey";

alter table "public"."event_timeline_locations_map" add constraint "event_timeline_locations_map_event_timeline_location_id_fkey" FOREIGN KEY (event_timeline_location_id) REFERENCES event_timeline_locations(id) not valid;

alter table "public"."event_timeline_locations_map" validate constraint "event_timeline_locations_map_event_timeline_location_id_fkey";

grant delete on table "public"."event_timeline_locations" to "anon";

grant insert on table "public"."event_timeline_locations" to "anon";

grant references on table "public"."event_timeline_locations" to "anon";

grant select on table "public"."event_timeline_locations" to "anon";

grant trigger on table "public"."event_timeline_locations" to "anon";

grant truncate on table "public"."event_timeline_locations" to "anon";

grant update on table "public"."event_timeline_locations" to "anon";

grant delete on table "public"."event_timeline_locations" to "authenticated";

grant insert on table "public"."event_timeline_locations" to "authenticated";

grant references on table "public"."event_timeline_locations" to "authenticated";

grant select on table "public"."event_timeline_locations" to "authenticated";

grant trigger on table "public"."event_timeline_locations" to "authenticated";

grant truncate on table "public"."event_timeline_locations" to "authenticated";

grant update on table "public"."event_timeline_locations" to "authenticated";

grant delete on table "public"."event_timeline_locations" to "service_role";

grant insert on table "public"."event_timeline_locations" to "service_role";

grant references on table "public"."event_timeline_locations" to "service_role";

grant select on table "public"."event_timeline_locations" to "service_role";

grant trigger on table "public"."event_timeline_locations" to "service_role";

grant truncate on table "public"."event_timeline_locations" to "service_role";

grant update on table "public"."event_timeline_locations" to "service_role";

grant delete on table "public"."event_timeline_locations_map" to "anon";

grant insert on table "public"."event_timeline_locations_map" to "anon";

grant references on table "public"."event_timeline_locations_map" to "anon";

grant select on table "public"."event_timeline_locations_map" to "anon";

grant trigger on table "public"."event_timeline_locations_map" to "anon";

grant truncate on table "public"."event_timeline_locations_map" to "anon";

grant update on table "public"."event_timeline_locations_map" to "anon";

grant delete on table "public"."event_timeline_locations_map" to "authenticated";

grant insert on table "public"."event_timeline_locations_map" to "authenticated";

grant references on table "public"."event_timeline_locations_map" to "authenticated";

grant select on table "public"."event_timeline_locations_map" to "authenticated";

grant trigger on table "public"."event_timeline_locations_map" to "authenticated";

grant truncate on table "public"."event_timeline_locations_map" to "authenticated";

grant update on table "public"."event_timeline_locations_map" to "authenticated";

grant delete on table "public"."event_timeline_locations_map" to "service_role";

grant insert on table "public"."event_timeline_locations_map" to "service_role";

grant references on table "public"."event_timeline_locations_map" to "service_role";

grant select on table "public"."event_timeline_locations_map" to "service_role";

grant trigger on table "public"."event_timeline_locations_map" to "service_role";

grant truncate on table "public"."event_timeline_locations_map" to "service_role";

grant update on table "public"."event_timeline_locations_map" to "service_role";

create policy "Admin can delete"
on "public"."event_timeline_locations"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_timeline_locations"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_timeline_locations"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_timeline_locations"
as permissive
for select
to public
using (true);


create policy "Admin can delete"
on "public"."event_timeline_locations_map"
as permissive
for select
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_timeline_locations_map"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_timeline_locations_map"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_timeline_locations_map"
as permissive
for select
to public
using (true);



