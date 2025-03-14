drop policy "Admin can delete" on "public"."event_roles";

drop policy "Admin can insert" on "public"."event_roles";

drop policy "Admin can update" on "public"."event_roles";

drop policy "Enable read access for all users" on "public"."event_roles";

revoke delete on table "public"."event_roles" from "anon";

revoke insert on table "public"."event_roles" from "anon";

revoke references on table "public"."event_roles" from "anon";

revoke select on table "public"."event_roles" from "anon";

revoke trigger on table "public"."event_roles" from "anon";

revoke truncate on table "public"."event_roles" from "anon";

revoke update on table "public"."event_roles" from "anon";

revoke delete on table "public"."event_roles" from "authenticated";

revoke insert on table "public"."event_roles" from "authenticated";

revoke references on table "public"."event_roles" from "authenticated";

revoke select on table "public"."event_roles" from "authenticated";

revoke trigger on table "public"."event_roles" from "authenticated";

revoke truncate on table "public"."event_roles" from "authenticated";

revoke update on table "public"."event_roles" from "authenticated";

revoke delete on table "public"."event_roles" from "service_role";

revoke insert on table "public"."event_roles" from "service_role";

revoke references on table "public"."event_roles" from "service_role";

revoke select on table "public"."event_roles" from "service_role";

revoke trigger on table "public"."event_roles" from "service_role";

revoke truncate on table "public"."event_roles" from "service_role";

revoke update on table "public"."event_roles" from "service_role";

alter table "public"."event_users" drop constraint "event_users_role_id_fkey";

alter table "public"."invitations" drop constraint "invitations_role_id_fkey";

alter table "public"."event_roles" drop constraint "event_roles_pkey";

drop index if exists "public"."event_roles_pkey";

drop table "public"."event_roles";

alter type "public"."permissions" rename to "permissions__old_version_to_be_dropped";

create type "public"."permissions" as enum ('EVENT_MNG', 'EVENT_UPDATE', 'EVENT_PARKING_LOT_UPDATE', 'EVENT_USERS_MNG', 'EVENT_USERS_VIEW', 'EVENT_USERS_CREATE', 'EVENT_USERS_UPDATE', 'EVENT_USERS_DELETE', 'EVENT_BRANDING_MNG', 'EVENT_BRANDING_UPDATE', 'EVENT_BRANDING_DELETE', 'EVENT_DELETE', 'EVENT_BRANDING_CREATE', 'EVENT_CONTACTS_MNG', 'EVENT_CONTACTS_CREATE', 'EVENT_CONTACTS_UPDATE', 'EVENT_CONTACTS_DELETE', 'EVENT_PARKING_LOT_MNG', 'EVENT_PARKING_LOT_CREATE', 'EVENT_PARKING_LOT_DELETE', 'EVENT_PARKING_LOT_COUNT_UPDATE', 'EVENT_PROGRAM_MNG', 'EVENT_PROGRAM_CREATE', 'EVENT_PROGRAM_UPDATE', 'EVENT_PROGRAM_DELETE', 'EVENT_GUEST_LIST_MNG', 'EVENT_GUEST_LIST_VIEW', 'EVENT_GUEST_LIST_UPDATE', 'EVENT_GUEST_LIST_DELETE', 'EVENT_ATTACHMENTS_MNG', 'EVENT_ATTACHMENTS_CREATE', 'EVENT_ATTACHMENTS_UPDATE', 'EVENT_ATTACHMENTS_DELETE', 'EVENT_SHUTTLE_PLAN_MNG', 'EVENT_SHUTTLE_PLAN_CREATE', 'EVENT_SHUTTLE_PLAN_UPDATE', 'EVENT_SHUTTLE_PLAN_DELETE');

create table "public"."roles" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "permissions" permissions[] not null,
    "title" json not null
);


alter table "public"."roles" enable row level security;

drop type "public"."permissions__old_version_to_be_dropped";

CREATE UNIQUE INDEX event_roles_pkey ON public.roles USING btree (id);

alter table "public"."roles" add constraint "event_roles_pkey" PRIMARY KEY using index "event_roles_pkey";

alter table "public"."event_users" add constraint "event_users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."event_users" validate constraint "event_users_role_id_fkey";

alter table "public"."invitations" add constraint "invitations_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "invitations_role_id_fkey";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

create policy "Admin can delete"
on "public"."roles"
as permissive
for delete
to public
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."roles"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."roles"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."roles"
as permissive
for select
to public
using (true);



