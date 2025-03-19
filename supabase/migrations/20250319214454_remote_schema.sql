create type "public"."alert_types" as enum ('warning', 'info', 'error', 'success');

create type "public"."shuttle_plan_directions" as enum ('OUTWARD', 'RETURN');

create table "public"."event_shuttle_plan" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "direction" shuttle_plan_directions not null,
    "location" text not null,
    "location_link" text not null,
    "order" smallint not null,
    "event_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_shuttle_plan" enable row level security;

create table "public"."event_shuttle_plan_alerts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "event_id" uuid not null default gen_random_uuid(),
    "type" alert_types,
    "icon" text,
    "message" json not null,
    "title" json
);


alter table "public"."event_shuttle_plan_alerts" enable row level security;

CREATE UNIQUE INDEX event_shuttle_plan_alerts_pkey ON public.event_shuttle_plan_alerts USING btree (id);

CREATE UNIQUE INDEX event_shuttle_plan_pkey ON public.event_shuttle_plan USING btree (id);

alter table "public"."event_shuttle_plan" add constraint "event_shuttle_plan_pkey" PRIMARY KEY using index "event_shuttle_plan_pkey";

alter table "public"."event_shuttle_plan_alerts" add constraint "event_shuttle_plan_alerts_pkey" PRIMARY KEY using index "event_shuttle_plan_alerts_pkey";

alter table "public"."event_shuttle_plan" add constraint "event_shuttle_plan_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_shuttle_plan" validate constraint "event_shuttle_plan_event_id_fkey";

alter table "public"."event_shuttle_plan_alerts" add constraint "event_shuttle_plan_alerts_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_shuttle_plan_alerts" validate constraint "event_shuttle_plan_alerts_event_id_fkey";

grant delete on table "public"."event_shuttle_plan" to "anon";

grant insert on table "public"."event_shuttle_plan" to "anon";

grant references on table "public"."event_shuttle_plan" to "anon";

grant select on table "public"."event_shuttle_plan" to "anon";

grant trigger on table "public"."event_shuttle_plan" to "anon";

grant truncate on table "public"."event_shuttle_plan" to "anon";

grant update on table "public"."event_shuttle_plan" to "anon";

grant delete on table "public"."event_shuttle_plan" to "authenticated";

grant insert on table "public"."event_shuttle_plan" to "authenticated";

grant references on table "public"."event_shuttle_plan" to "authenticated";

grant select on table "public"."event_shuttle_plan" to "authenticated";

grant trigger on table "public"."event_shuttle_plan" to "authenticated";

grant truncate on table "public"."event_shuttle_plan" to "authenticated";

grant update on table "public"."event_shuttle_plan" to "authenticated";

grant delete on table "public"."event_shuttle_plan" to "service_role";

grant insert on table "public"."event_shuttle_plan" to "service_role";

grant references on table "public"."event_shuttle_plan" to "service_role";

grant select on table "public"."event_shuttle_plan" to "service_role";

grant trigger on table "public"."event_shuttle_plan" to "service_role";

grant truncate on table "public"."event_shuttle_plan" to "service_role";

grant update on table "public"."event_shuttle_plan" to "service_role";

grant delete on table "public"."event_shuttle_plan_alerts" to "anon";

grant insert on table "public"."event_shuttle_plan_alerts" to "anon";

grant references on table "public"."event_shuttle_plan_alerts" to "anon";

grant select on table "public"."event_shuttle_plan_alerts" to "anon";

grant trigger on table "public"."event_shuttle_plan_alerts" to "anon";

grant truncate on table "public"."event_shuttle_plan_alerts" to "anon";

grant update on table "public"."event_shuttle_plan_alerts" to "anon";

grant delete on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant insert on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant references on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant select on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant trigger on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant truncate on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant update on table "public"."event_shuttle_plan_alerts" to "authenticated";

grant delete on table "public"."event_shuttle_plan_alerts" to "service_role";

grant insert on table "public"."event_shuttle_plan_alerts" to "service_role";

grant references on table "public"."event_shuttle_plan_alerts" to "service_role";

grant select on table "public"."event_shuttle_plan_alerts" to "service_role";

grant trigger on table "public"."event_shuttle_plan_alerts" to "service_role";

grant truncate on table "public"."event_shuttle_plan_alerts" to "service_role";

grant update on table "public"."event_shuttle_plan_alerts" to "service_role";

create policy "Admin can delete"
on "public"."event_shuttle_plan"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_shuttle_plan"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_shuttle_plan"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_shuttle_plan"
as permissive
for select
to public
using (true);


create policy "Admin can delete"
on "public"."event_shuttle_plan_alerts"
as permissive
for delete
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can insert"
on "public"."event_shuttle_plan_alerts"
as permissive
for insert
to authenticated
with check ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb));


create policy "Admin can update"
on "public"."event_shuttle_plan_alerts"
as permissive
for update
to authenticated
using ((get_my_claim('userroles'::text) @> '["ADMIN"]'::jsonb))
with check (true);


create policy "Enable read access for all users"
on "public"."event_shuttle_plan_alerts"
as permissive
for select
to public
using (true);



