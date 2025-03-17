drop policy "Admin can delete" on "public"."invitations";

drop policy "Admin can insert" on "public"."invitations";

drop policy "Admin can update" on "public"."invitations";

drop policy "Enable read access for all users" on "public"."invitations";

revoke delete on table "public"."invitations" from "anon";

revoke insert on table "public"."invitations" from "anon";

revoke references on table "public"."invitations" from "anon";

revoke select on table "public"."invitations" from "anon";

revoke trigger on table "public"."invitations" from "anon";

revoke truncate on table "public"."invitations" from "anon";

revoke update on table "public"."invitations" from "anon";

revoke delete on table "public"."invitations" from "authenticated";

revoke insert on table "public"."invitations" from "authenticated";

revoke references on table "public"."invitations" from "authenticated";

revoke select on table "public"."invitations" from "authenticated";

revoke trigger on table "public"."invitations" from "authenticated";

revoke truncate on table "public"."invitations" from "authenticated";

revoke update on table "public"."invitations" from "authenticated";

revoke delete on table "public"."invitations" from "service_role";

revoke insert on table "public"."invitations" from "service_role";

revoke references on table "public"."invitations" from "service_role";

revoke select on table "public"."invitations" from "service_role";

revoke trigger on table "public"."invitations" from "service_role";

revoke truncate on table "public"."invitations" from "service_role";

revoke update on table "public"."invitations" from "service_role";

alter table "public"."invitations" drop constraint "invitations_event_id_fkey";

alter table "public"."invitations" drop constraint "invitations_role_id_fkey";

alter table "public"."invitations" drop constraint "invitations_pkey";

drop index if exists "public"."invitations_pkey";

drop table "public"."invitations";

create table "public"."event_invitations" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "message" text,
    "status" invitation_status not null,
    "role_id" uuid not null,
    "event_id" uuid not null
);


alter table "public"."event_invitations" enable row level security;

CREATE UNIQUE INDEX invitations_pkey ON public.event_invitations USING btree (id);

alter table "public"."event_invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."event_invitations" add constraint "invitations_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_invitations" validate constraint "invitations_event_id_fkey";

alter table "public"."event_invitations" add constraint "invitations_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."event_invitations" validate constraint "invitations_role_id_fkey";

grant delete on table "public"."event_invitations" to "anon";

grant insert on table "public"."event_invitations" to "anon";

grant references on table "public"."event_invitations" to "anon";

grant select on table "public"."event_invitations" to "anon";

grant trigger on table "public"."event_invitations" to "anon";

grant truncate on table "public"."event_invitations" to "anon";

grant update on table "public"."event_invitations" to "anon";

grant delete on table "public"."event_invitations" to "authenticated";

grant insert on table "public"."event_invitations" to "authenticated";

grant references on table "public"."event_invitations" to "authenticated";

grant select on table "public"."event_invitations" to "authenticated";

grant trigger on table "public"."event_invitations" to "authenticated";

grant truncate on table "public"."event_invitations" to "authenticated";

grant update on table "public"."event_invitations" to "authenticated";

grant delete on table "public"."event_invitations" to "service_role";

grant insert on table "public"."event_invitations" to "service_role";

grant references on table "public"."event_invitations" to "service_role";

grant select on table "public"."event_invitations" to "service_role";

grant trigger on table "public"."event_invitations" to "service_role";

grant truncate on table "public"."event_invitations" to "service_role";

grant update on table "public"."event_invitations" to "service_role";

create policy "Admin can delete"
on "public"."event_invitations"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_invitations"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_invitations"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_invitations"
as permissive
for select
to public
using (true);



