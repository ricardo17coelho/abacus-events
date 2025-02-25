create table "public"."event_parking_lots" (
    "event_id" uuid not null default gen_random_uuid(),
    "parking_lot_id" uuid not null default gen_random_uuid()
);


alter table "public"."event_parking_lots" enable row level security;

CREATE UNIQUE INDEX event_parking_lots_pkey ON public.event_parking_lots USING btree (event_id, parking_lot_id);

alter table "public"."event_parking_lots" add constraint "event_parking_lots_pkey" PRIMARY KEY using index "event_parking_lots_pkey";

alter table "public"."event_parking_lots" add constraint "event_parking_lots_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_parking_lots" validate constraint "event_parking_lots_event_id_fkey";

alter table "public"."event_parking_lots" add constraint "event_parking_lots_parking_lot_id_fkey" FOREIGN KEY (parking_lot_id) REFERENCES parking_lots(id) ON DELETE CASCADE not valid;

alter table "public"."event_parking_lots" validate constraint "event_parking_lots_parking_lot_id_fkey";

grant delete on table "public"."event_parking_lots" to "anon";

grant insert on table "public"."event_parking_lots" to "anon";

grant references on table "public"."event_parking_lots" to "anon";

grant select on table "public"."event_parking_lots" to "anon";

grant trigger on table "public"."event_parking_lots" to "anon";

grant truncate on table "public"."event_parking_lots" to "anon";

grant update on table "public"."event_parking_lots" to "anon";

grant delete on table "public"."event_parking_lots" to "authenticated";

grant insert on table "public"."event_parking_lots" to "authenticated";

grant references on table "public"."event_parking_lots" to "authenticated";

grant select on table "public"."event_parking_lots" to "authenticated";

grant trigger on table "public"."event_parking_lots" to "authenticated";

grant truncate on table "public"."event_parking_lots" to "authenticated";

grant update on table "public"."event_parking_lots" to "authenticated";

grant delete on table "public"."event_parking_lots" to "service_role";

grant insert on table "public"."event_parking_lots" to "service_role";

grant references on table "public"."event_parking_lots" to "service_role";

grant select on table "public"."event_parking_lots" to "service_role";

grant trigger on table "public"."event_parking_lots" to "service_role";

grant truncate on table "public"."event_parking_lots" to "service_role";

grant update on table "public"."event_parking_lots" to "service_role";

create policy "Enable read access for all users"
on "public"."event_parking_lots"
as permissive
for select
to public
using (true);


create policy "Admin can add"
on "public"."parking_lots"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text))));


create policy "Admin can delete"
on "public"."parking_lots"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text))));


create policy "Admin can update"
on "public"."parking_lots"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text))))
with check (true);



