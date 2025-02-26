create policy "Admin can create"
on "public"."events"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text))));


create policy "Admin can delete"
on "public"."events"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text))));


create policy "Admin can update"
on "public"."events"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text))))
with check (true);



