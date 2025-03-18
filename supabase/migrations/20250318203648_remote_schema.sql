create table "public"."event_contacts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "type" text not null,
    "value" text not null,
    "description" text not null,
    "event_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_contacts" enable row level security;

CREATE UNIQUE INDEX event_contacts_pkey ON public.event_contacts USING btree (id);

alter table "public"."event_contacts" add constraint "event_contacts_pkey" PRIMARY KEY using index "event_contacts_pkey";

alter table "public"."event_contacts" add constraint "event_contacts_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_contacts" validate constraint "event_contacts_event_id_fkey";

grant delete on table "public"."event_contacts" to "anon";

grant insert on table "public"."event_contacts" to "anon";

grant references on table "public"."event_contacts" to "anon";

grant select on table "public"."event_contacts" to "anon";

grant trigger on table "public"."event_contacts" to "anon";

grant truncate on table "public"."event_contacts" to "anon";

grant update on table "public"."event_contacts" to "anon";

grant delete on table "public"."event_contacts" to "authenticated";

grant insert on table "public"."event_contacts" to "authenticated";

grant references on table "public"."event_contacts" to "authenticated";

grant select on table "public"."event_contacts" to "authenticated";

grant trigger on table "public"."event_contacts" to "authenticated";

grant truncate on table "public"."event_contacts" to "authenticated";

grant update on table "public"."event_contacts" to "authenticated";

grant delete on table "public"."event_contacts" to "service_role";

grant insert on table "public"."event_contacts" to "service_role";

grant references on table "public"."event_contacts" to "service_role";

grant select on table "public"."event_contacts" to "service_role";

grant trigger on table "public"."event_contacts" to "service_role";

grant truncate on table "public"."event_contacts" to "service_role";

grant update on table "public"."event_contacts" to "service_role";

create policy "Admin can delete"
on "public"."event_contacts"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_contacts"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_contacts"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_contacts"
as permissive
for select
to public
using (true);



