create table "public"."translations_cache" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "source_text" text not null,
    "source_lang" text not null,
    "translation_text" text not null,
    "translation_lang" text not null
);


alter table "public"."translations_cache" enable row level security;

CREATE UNIQUE INDEX translations_cache_pkey ON public.translations_cache USING btree (id);

alter table "public"."translations_cache" add constraint "translations_cache_pkey" PRIMARY KEY using index "translations_cache_pkey";

grant delete on table "public"."translations_cache" to "anon";

grant insert on table "public"."translations_cache" to "anon";

grant references on table "public"."translations_cache" to "anon";

grant select on table "public"."translations_cache" to "anon";

grant trigger on table "public"."translations_cache" to "anon";

grant truncate on table "public"."translations_cache" to "anon";

grant update on table "public"."translations_cache" to "anon";

grant delete on table "public"."translations_cache" to "authenticated";

grant insert on table "public"."translations_cache" to "authenticated";

grant references on table "public"."translations_cache" to "authenticated";

grant select on table "public"."translations_cache" to "authenticated";

grant trigger on table "public"."translations_cache" to "authenticated";

grant truncate on table "public"."translations_cache" to "authenticated";

grant update on table "public"."translations_cache" to "authenticated";

grant delete on table "public"."translations_cache" to "service_role";

grant insert on table "public"."translations_cache" to "service_role";

grant references on table "public"."translations_cache" to "service_role";

grant select on table "public"."translations_cache" to "service_role";

grant trigger on table "public"."translations_cache" to "service_role";

grant truncate on table "public"."translations_cache" to "service_role";

grant update on table "public"."translations_cache" to "service_role";

create policy "Users can insert his own data"
on "public"."profile_settings"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can select his own data"
on "public"."profile_settings"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can update his own data"
on "public"."profile_settings"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."translations_cache"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."translations_cache"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for authenticated users only"
on "public"."translations_cache"
as permissive
for update
to authenticated
using (true)
with check (true);



