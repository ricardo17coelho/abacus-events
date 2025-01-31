create type "public"."invitation_status" as enum ('PENDING', 'ACCEPTED', 'DECLINED');

create type "public"."permissions" as enum ('EVENT_MNG', 'EVENT_UPDATE', 'EVENT_PARKING_LOT_UPDATE', 'EVENT_USERS_MNG', 'EVENT_USERS_VIEW', 'EVENT_USERS_CREATE', 'EVENT_USERS_UPDATE', 'EVENT_USERS_DELETE', 'EVENT_BRANDING_MNG', 'EVENT_BRANDING_UPDATE', 'EVENT_BRANDING_DELETE');

drop policy "isAuthenticated" on "public"."parking_lots";

revoke delete on table "public"."program_timeline" from "anon";

revoke insert on table "public"."program_timeline" from "anon";

revoke references on table "public"."program_timeline" from "anon";

revoke select on table "public"."program_timeline" from "anon";

revoke trigger on table "public"."program_timeline" from "anon";

revoke truncate on table "public"."program_timeline" from "anon";

revoke update on table "public"."program_timeline" from "anon";

revoke delete on table "public"."program_timeline" from "authenticated";

revoke insert on table "public"."program_timeline" from "authenticated";

revoke references on table "public"."program_timeline" from "authenticated";

revoke select on table "public"."program_timeline" from "authenticated";

revoke trigger on table "public"."program_timeline" from "authenticated";

revoke truncate on table "public"."program_timeline" from "authenticated";

revoke update on table "public"."program_timeline" from "authenticated";

revoke delete on table "public"."program_timeline" from "service_role";

revoke insert on table "public"."program_timeline" from "service_role";

revoke references on table "public"."program_timeline" from "service_role";

revoke select on table "public"."program_timeline" from "service_role";

revoke trigger on table "public"."program_timeline" from "service_role";

revoke truncate on table "public"."program_timeline" from "service_role";

revoke update on table "public"."program_timeline" from "service_role";

revoke delete on table "public"."program_timeline_category" from "anon";

revoke insert on table "public"."program_timeline_category" from "anon";

revoke references on table "public"."program_timeline_category" from "anon";

revoke select on table "public"."program_timeline_category" from "anon";

revoke trigger on table "public"."program_timeline_category" from "anon";

revoke truncate on table "public"."program_timeline_category" from "anon";

revoke update on table "public"."program_timeline_category" from "anon";

revoke delete on table "public"."program_timeline_category" from "authenticated";

revoke insert on table "public"."program_timeline_category" from "authenticated";

revoke references on table "public"."program_timeline_category" from "authenticated";

revoke select on table "public"."program_timeline_category" from "authenticated";

revoke trigger on table "public"."program_timeline_category" from "authenticated";

revoke truncate on table "public"."program_timeline_category" from "authenticated";

revoke update on table "public"."program_timeline_category" from "authenticated";

revoke delete on table "public"."program_timeline_category" from "service_role";

revoke insert on table "public"."program_timeline_category" from "service_role";

revoke references on table "public"."program_timeline_category" from "service_role";

revoke select on table "public"."program_timeline_category" from "service_role";

revoke trigger on table "public"."program_timeline_category" from "service_role";

revoke truncate on table "public"."program_timeline_category" from "service_role";

revoke update on table "public"."program_timeline_category" from "service_role";

alter table "public"."program_timeline" drop constraint "program_timeline_pkey";

alter table "public"."program_timeline_category" drop constraint "program_timeline_category_pkey";

drop index if exists "public"."program_timeline_category_pkey";

drop index if exists "public"."program_timeline_pkey";

drop table "public"."program_timeline";

drop table "public"."program_timeline_category";

create table "public"."event_roles" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "permissions" permissions[] not null,
    "name" json not null
);


alter table "public"."event_roles" enable row level security;

create table "public"."event_timeline" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "title" json not null,
    "locations" text[],
    "time_start" text,
    "time_end" text,
    "note" json,
    "icon" text,
    "event_id" uuid not null,
    "category" uuid not null
);


alter table "public"."event_timeline" enable row level security;

create table "public"."event_timeline_category" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "title" json not null,
    "color" text,
    "event_id" uuid not null,
    "icon" text
);


alter table "public"."event_timeline_category" enable row level security;

create table "public"."event_users" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "role_id" uuid not null,
    "event_id" uuid not null
);


alter table "public"."event_users" enable row level security;

create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" json not null,
    "description" json not null,
    "date" date not null,
    "banner" text,
    "slug" text
);


alter table "public"."events" enable row level security;

create table "public"."invitations" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "message" text,
    "status" invitation_status not null,
    "role_id" uuid not null,
    "event_id" uuid not null
);


alter table "public"."invitations" enable row level security;

alter table "public"."parking_lots" drop column "name";

alter table "public"."parking_lots" add column "title" json not null;

alter table "public"."parking_lots" alter column "id" set default uuid_generate_v4();

alter table "public"."parking_lots" alter column "id" drop identity;

alter table "public"."parking_lots" alter column "id" set data type uuid using "id"::uuid;

CREATE UNIQUE INDEX event_roles_pkey ON public.event_roles USING btree (id);

CREATE UNIQUE INDEX event_users_pkey ON public.event_users USING btree (user_id, role_id, event_id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX invitations_pkey ON public.invitations USING btree (id);

CREATE UNIQUE INDEX program_timeline_category_pkey ON public.event_timeline_category USING btree (id);

CREATE UNIQUE INDEX program_timeline_pkey ON public.event_timeline USING btree (id);

alter table "public"."event_roles" add constraint "event_roles_pkey" PRIMARY KEY using index "event_roles_pkey";

alter table "public"."event_timeline" add constraint "program_timeline_pkey" PRIMARY KEY using index "program_timeline_pkey";

alter table "public"."event_timeline_category" add constraint "program_timeline_category_pkey" PRIMARY KEY using index "program_timeline_category_pkey";

alter table "public"."event_users" add constraint "event_users_pkey" PRIMARY KEY using index "event_users_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."event_timeline" add constraint "event_timeline_category_id_fkey" FOREIGN KEY (category) REFERENCES event_timeline_category(id) ON DELETE CASCADE not valid;

alter table "public"."event_timeline" validate constraint "event_timeline_category_id_fkey";

alter table "public"."event_timeline" add constraint "event_timeline_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_timeline" validate constraint "event_timeline_event_id_fkey";

alter table "public"."event_timeline_category" add constraint "event_timeline_category_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_timeline_category" validate constraint "event_timeline_category_event_id_fkey";

alter table "public"."event_users" add constraint "event_users_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_users" validate constraint "event_users_event_id_fkey";

alter table "public"."event_users" add constraint "event_users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES event_roles(id) ON DELETE CASCADE not valid;

alter table "public"."event_users" validate constraint "event_users_role_id_fkey";

alter table "public"."event_users" add constraint "event_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_users" validate constraint "event_users_user_id_fkey";

alter table "public"."invitations" add constraint "invitations_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "invitations_event_id_fkey";

alter table "public"."invitations" add constraint "invitations_role_id_fkey" FOREIGN KEY (role_id) REFERENCES event_roles(id) ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "invitations_role_id_fkey";

grant delete on table "public"."event_roles" to "anon";

grant insert on table "public"."event_roles" to "anon";

grant references on table "public"."event_roles" to "anon";

grant select on table "public"."event_roles" to "anon";

grant trigger on table "public"."event_roles" to "anon";

grant truncate on table "public"."event_roles" to "anon";

grant update on table "public"."event_roles" to "anon";

grant delete on table "public"."event_roles" to "authenticated";

grant insert on table "public"."event_roles" to "authenticated";

grant references on table "public"."event_roles" to "authenticated";

grant select on table "public"."event_roles" to "authenticated";

grant trigger on table "public"."event_roles" to "authenticated";

grant truncate on table "public"."event_roles" to "authenticated";

grant update on table "public"."event_roles" to "authenticated";

grant delete on table "public"."event_roles" to "service_role";

grant insert on table "public"."event_roles" to "service_role";

grant references on table "public"."event_roles" to "service_role";

grant select on table "public"."event_roles" to "service_role";

grant trigger on table "public"."event_roles" to "service_role";

grant truncate on table "public"."event_roles" to "service_role";

grant update on table "public"."event_roles" to "service_role";

grant delete on table "public"."event_timeline" to "anon";

grant insert on table "public"."event_timeline" to "anon";

grant references on table "public"."event_timeline" to "anon";

grant select on table "public"."event_timeline" to "anon";

grant trigger on table "public"."event_timeline" to "anon";

grant truncate on table "public"."event_timeline" to "anon";

grant update on table "public"."event_timeline" to "anon";

grant delete on table "public"."event_timeline" to "authenticated";

grant insert on table "public"."event_timeline" to "authenticated";

grant references on table "public"."event_timeline" to "authenticated";

grant select on table "public"."event_timeline" to "authenticated";

grant trigger on table "public"."event_timeline" to "authenticated";

grant truncate on table "public"."event_timeline" to "authenticated";

grant update on table "public"."event_timeline" to "authenticated";

grant delete on table "public"."event_timeline" to "service_role";

grant insert on table "public"."event_timeline" to "service_role";

grant references on table "public"."event_timeline" to "service_role";

grant select on table "public"."event_timeline" to "service_role";

grant trigger on table "public"."event_timeline" to "service_role";

grant truncate on table "public"."event_timeline" to "service_role";

grant update on table "public"."event_timeline" to "service_role";

grant delete on table "public"."event_timeline_category" to "anon";

grant insert on table "public"."event_timeline_category" to "anon";

grant references on table "public"."event_timeline_category" to "anon";

grant select on table "public"."event_timeline_category" to "anon";

grant trigger on table "public"."event_timeline_category" to "anon";

grant truncate on table "public"."event_timeline_category" to "anon";

grant update on table "public"."event_timeline_category" to "anon";

grant delete on table "public"."event_timeline_category" to "authenticated";

grant insert on table "public"."event_timeline_category" to "authenticated";

grant references on table "public"."event_timeline_category" to "authenticated";

grant select on table "public"."event_timeline_category" to "authenticated";

grant trigger on table "public"."event_timeline_category" to "authenticated";

grant truncate on table "public"."event_timeline_category" to "authenticated";

grant update on table "public"."event_timeline_category" to "authenticated";

grant delete on table "public"."event_timeline_category" to "service_role";

grant insert on table "public"."event_timeline_category" to "service_role";

grant references on table "public"."event_timeline_category" to "service_role";

grant select on table "public"."event_timeline_category" to "service_role";

grant trigger on table "public"."event_timeline_category" to "service_role";

grant truncate on table "public"."event_timeline_category" to "service_role";

grant update on table "public"."event_timeline_category" to "service_role";

grant delete on table "public"."event_users" to "anon";

grant insert on table "public"."event_users" to "anon";

grant references on table "public"."event_users" to "anon";

grant select on table "public"."event_users" to "anon";

grant trigger on table "public"."event_users" to "anon";

grant truncate on table "public"."event_users" to "anon";

grant update on table "public"."event_users" to "anon";

grant delete on table "public"."event_users" to "authenticated";

grant insert on table "public"."event_users" to "authenticated";

grant references on table "public"."event_users" to "authenticated";

grant select on table "public"."event_users" to "authenticated";

grant trigger on table "public"."event_users" to "authenticated";

grant truncate on table "public"."event_users" to "authenticated";

grant update on table "public"."event_users" to "authenticated";

grant delete on table "public"."event_users" to "service_role";

grant insert on table "public"."event_users" to "service_role";

grant references on table "public"."event_users" to "service_role";

grant select on table "public"."event_users" to "service_role";

grant trigger on table "public"."event_users" to "service_role";

grant truncate on table "public"."event_users" to "service_role";

grant update on table "public"."event_users" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."invitations" to "anon";

grant insert on table "public"."invitations" to "anon";

grant references on table "public"."invitations" to "anon";

grant select on table "public"."invitations" to "anon";

grant trigger on table "public"."invitations" to "anon";

grant truncate on table "public"."invitations" to "anon";

grant update on table "public"."invitations" to "anon";

grant delete on table "public"."invitations" to "authenticated";

grant insert on table "public"."invitations" to "authenticated";

grant references on table "public"."invitations" to "authenticated";

grant select on table "public"."invitations" to "authenticated";

grant trigger on table "public"."invitations" to "authenticated";

grant truncate on table "public"."invitations" to "authenticated";

grant update on table "public"."invitations" to "authenticated";

grant delete on table "public"."invitations" to "service_role";

grant insert on table "public"."invitations" to "service_role";

grant references on table "public"."invitations" to "service_role";

grant select on table "public"."invitations" to "service_role";

grant trigger on table "public"."invitations" to "service_role";

grant truncate on table "public"."invitations" to "service_role";

grant update on table "public"."invitations" to "service_role";

create policy "Enable read access for all users"
on "public"."event_roles"
as permissive
for select
to public
using (true);


create policy "Claim Admin: can insert"
on "public"."event_timeline"
as permissive
for insert
to public
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Claim Admin: can update"
on "public"."event_timeline"
as permissive
for update
to public
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_timeline"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."event_timeline_category"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."event_users"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."events"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."invitations"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."parking_lots"
as permissive
for select
to public
using (true);



