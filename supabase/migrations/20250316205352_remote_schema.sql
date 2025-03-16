create policy "Only ADMIN can access event storage"
on "storage"."objects"
as permissive
for all
to public
using (((bucket_id = 'events'::text) AND (name ~~ '%/%'::text) AND (EXISTS ( SELECT 1
   FROM jsonb_array_elements_text(get_my_claim('userroles'::text)) role(value)
  WHERE (role.value = 'ADMIN'::text)))));



