create table "public"."event_persons" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "first_name" text not null,
    "last_name" text not null,
    "avatar_url" text,
    "bio" json,
    "description" json,
    "event_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_persons" enable row level security;

create table "public"."event_timeline_persons" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "event_person_id" uuid not null default gen_random_uuid(),
    "event_timeline_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_timeline_persons" enable row level security;

alter table "public"."events" add column "subtitle" json;

alter table "public"."events" alter column "description" drop not null;

CREATE UNIQUE INDEX event_persons_pkey ON public.event_persons USING btree (id);

CREATE UNIQUE INDEX event_timeline_persons_pkey ON public.event_timeline_persons USING btree (id);

alter table "public"."event_persons" add constraint "event_persons_pkey" PRIMARY KEY using index "event_persons_pkey";

alter table "public"."event_timeline_persons" add constraint "event_timeline_persons_pkey" PRIMARY KEY using index "event_timeline_persons_pkey";

alter table "public"."event_persons" add constraint "event_persons_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."event_persons" validate constraint "event_persons_event_id_fkey";

alter table "public"."event_timeline_persons" add constraint "event_timeline_persons_event_person_id_fkey" FOREIGN KEY (event_person_id) REFERENCES event_persons(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."event_timeline_persons" validate constraint "event_timeline_persons_event_person_id_fkey";

alter table "public"."event_timeline_persons" add constraint "event_timeline_persons_event_timeline_id_fkey" FOREIGN KEY (event_timeline_id) REFERENCES event_timeline(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."event_timeline_persons" validate constraint "event_timeline_persons_event_timeline_id_fkey";

grant delete on table "public"."event_persons" to "anon";

grant insert on table "public"."event_persons" to "anon";

grant references on table "public"."event_persons" to "anon";

grant select on table "public"."event_persons" to "anon";

grant trigger on table "public"."event_persons" to "anon";

grant truncate on table "public"."event_persons" to "anon";

grant update on table "public"."event_persons" to "anon";

grant delete on table "public"."event_persons" to "authenticated";

grant insert on table "public"."event_persons" to "authenticated";

grant references on table "public"."event_persons" to "authenticated";

grant select on table "public"."event_persons" to "authenticated";

grant trigger on table "public"."event_persons" to "authenticated";

grant truncate on table "public"."event_persons" to "authenticated";

grant update on table "public"."event_persons" to "authenticated";

grant delete on table "public"."event_persons" to "service_role";

grant insert on table "public"."event_persons" to "service_role";

grant references on table "public"."event_persons" to "service_role";

grant select on table "public"."event_persons" to "service_role";

grant trigger on table "public"."event_persons" to "service_role";

grant truncate on table "public"."event_persons" to "service_role";

grant update on table "public"."event_persons" to "service_role";

grant delete on table "public"."event_timeline_persons" to "anon";

grant insert on table "public"."event_timeline_persons" to "anon";

grant references on table "public"."event_timeline_persons" to "anon";

grant select on table "public"."event_timeline_persons" to "anon";

grant trigger on table "public"."event_timeline_persons" to "anon";

grant truncate on table "public"."event_timeline_persons" to "anon";

grant update on table "public"."event_timeline_persons" to "anon";

grant delete on table "public"."event_timeline_persons" to "authenticated";

grant insert on table "public"."event_timeline_persons" to "authenticated";

grant references on table "public"."event_timeline_persons" to "authenticated";

grant select on table "public"."event_timeline_persons" to "authenticated";

grant trigger on table "public"."event_timeline_persons" to "authenticated";

grant truncate on table "public"."event_timeline_persons" to "authenticated";

grant update on table "public"."event_timeline_persons" to "authenticated";

grant delete on table "public"."event_timeline_persons" to "service_role";

grant insert on table "public"."event_timeline_persons" to "service_role";

grant references on table "public"."event_timeline_persons" to "service_role";

grant select on table "public"."event_timeline_persons" to "service_role";

grant trigger on table "public"."event_timeline_persons" to "service_role";

grant truncate on table "public"."event_timeline_persons" to "service_role";

grant update on table "public"."event_timeline_persons" to "service_role";

create policy "Admin can delete"
on "public"."event_persons"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_persons"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_persons"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_persons"
as permissive
for select
to public
using (true);


create policy "Admin can delete"
on "public"."event_timeline_persons"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_timeline_persons"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_timeline_persons"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_timeline_persons"
as permissive
for select
to public
using (true);



