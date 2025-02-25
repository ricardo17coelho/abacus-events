SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '14a7e97e-56ca-4191-aa6b-b7bbe60581f0', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sara.corradini@deepcloud.swiss","user_id":"101e2b07-6ba0-421e-9047-345e128216e2","user_phone":""}}', '2025-01-29 13:29:14.872169+00', ''),
	('00000000-0000-0000-0000-000000000000', '72ba634a-f951-4e37-9d9d-98c0b48e8054', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"devel@rmorgado.ch","user_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","user_phone":""}}', '2025-01-29 13:29:48.010223+00', ''),
	('00000000-0000-0000-0000-000000000000', '3864ec3e-3aa9-47af-b3f1-07fa4033f216', '{"action":"login","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-29 13:29:57.434563+00', ''),
	('00000000-0000-0000-0000-000000000000', '7343d24f-c72c-404b-8767-09886b7d3946', '{"action":"logout","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"account"}', '2025-01-29 13:30:07.731645+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ec4ee70-9fc2-4bd6-b1f9-b64f8bc567fe', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sara.corradini@deepcloud.swiss","user_id":"101e2b07-6ba0-421e-9047-345e128216e2","user_phone":""}}', '2025-01-29 13:32:00.372983+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5cc460e-976e-4ded-98bf-a2b9ffb30a33', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sara.corradini@deepcloud.swiss","user_id":"4101195b-af95-4367-b442-42c69886fd68","user_phone":""}}', '2025-01-29 13:32:39.44231+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d955bf0-883a-4d1d-b85a-ae3e56b8c580', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sara.corradini@deepcloud.swiss","user_id":"4101195b-af95-4367-b442-42c69886fd68","user_phone":""}}', '2025-01-29 13:33:53.611544+00', ''),
	('00000000-0000-0000-0000-000000000000', '6aa50012-fe99-4222-9e24-3d0a537c2426', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sara.corradini@deepcloud.swiss","user_id":"86280987-144c-4bc1-b0b7-6b5766366622","user_phone":""}}', '2025-01-29 13:34:24.958425+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8c31f5c-de9d-4eaf-8d76-258a11228d36', '{"action":"login","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-29 13:34:50.293036+00', ''),
	('00000000-0000-0000-0000-000000000000', '593a3098-3843-4f00-8984-ba1fd06e3220', '{"action":"logout","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account"}', '2025-01-29 13:38:14.517103+00', ''),
	('00000000-0000-0000-0000-000000000000', '15fb9709-ca69-4faf-852d-258c64de95b0', '{"action":"login","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-29 13:38:39.573432+00', ''),
	('00000000-0000-0000-0000-000000000000', '46ea3556-dc99-4b17-b985-bd342f923869', '{"action":"logout","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account"}', '2025-01-29 13:42:10.72683+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e62efbdb-7571-4584-a7a1-46d16cde2078', '{"action":"login","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-29 13:42:29.123443+00', ''),
	('00000000-0000-0000-0000-000000000000', '30bd478c-4fe7-411e-88fe-ed7eff6c4e2e', '{"action":"logout","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account"}', '2025-01-29 13:45:14.884133+00', ''),
	('00000000-0000-0000-0000-000000000000', '6cdf1449-85df-42de-abd1-e08baf8bca8d', '{"action":"login","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-29 13:45:25.093508+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c82f461e-9a03-4a6d-b892-0fc3f85327c9', '{"action":"token_refreshed","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"token"}', '2025-01-30 06:16:54.69357+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1af4711-52e6-4bbe-abf8-7163a1ef4cdb', '{"action":"token_revoked","actor_id":"86280987-144c-4bc1-b0b7-6b5766366622","actor_username":"sara.corradini@deepcloud.swiss","actor_via_sso":false,"log_type":"token"}', '2025-01-30 06:16:54.704723+00', ''),
	('00000000-0000-0000-0000-000000000000', '150da693-129f-47f7-b58b-eb79f74b1afb', '{"action":"login","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-31 11:58:34.837563+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9d2c02e-6bc2-4dc7-b32b-d2d02b76724b', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 16:40:41.975081+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ec03e32-f06c-4e67-8697-b7c2dcb75aa2', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 16:40:41.980538+00', ''),
	('00000000-0000-0000-0000-000000000000', '549c5403-7313-4c5d-998a-e2cd5c3b9692', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 17:53:55.252138+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f369d8b2-7bbc-490b-b49d-759a028b3613', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 17:53:55.253591+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5442325-4d47-4056-a829-113bd81cdd5b', '{"action":"login","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-01-31 17:58:13.163927+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dc2b261-075c-4f60-ae95-036eca3a946a', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 19:04:00.325581+00', ''),
	('00000000-0000-0000-0000-000000000000', '23756cab-43e1-4ab5-aa9b-80ce6f8ee206', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 19:04:00.327161+00', ''),
	('00000000-0000-0000-0000-000000000000', '429cbb2e-f10e-4bfd-b308-8d34a422c00a', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 19:17:14.36435+00', ''),
	('00000000-0000-0000-0000-000000000000', '10c13e8f-653a-4ba1-b213-161f624c5731', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 19:17:14.365753+00', ''),
	('00000000-0000-0000-0000-000000000000', '346e013b-ee94-44b8-8039-f3f0413a6b7b', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 20:05:40.105136+00', ''),
	('00000000-0000-0000-0000-000000000000', '27fd8300-c774-4a25-aab5-b957433daa75', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 20:05:40.106579+00', ''),
	('00000000-0000-0000-0000-000000000000', '69e1a789-2a93-4158-90f4-93b1878a3106', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 21:05:51.415614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c29f0895-40a7-4464-9532-91ce5ee4dad5', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 21:05:51.41651+00', ''),
	('00000000-0000-0000-0000-000000000000', '92f4b519-d64e-4cbc-9df1-4ba9e31c53f7', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 22:06:03.074846+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa9c5502-6e0c-4182-a665-79a714e9a7e6', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 22:06:03.076457+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a1ff6b4-3089-4bea-b926-f10537ce82d0', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 22:40:50.9678+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6241ff8-11ff-4d44-8e9b-0ea606a3322d', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 22:40:50.969366+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc651963-f579-47d8-b4a2-babdacbf755a', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 23:06:00.752359+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dead431d-55ce-4701-b767-58e703b8a345', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-01-31 23:06:00.753335+00', ''),
	('00000000-0000-0000-0000-000000000000', '518d56d8-d638-4e6f-b770-88a27ed43702', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-01 00:14:18.834944+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7db9a32-2938-462d-976e-89ae32634845', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-01 00:14:18.836417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8ffae36-2758-4d8b-86a5-2f75470d5c12', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-01 16:15:03.59821+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e77eb0e2-b25d-4e67-8617-74da4281b75a', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-01 16:15:03.608715+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f26e1fc-37dc-4e5b-9b6a-f1563c4948f4', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-01 18:50:52.402964+00', ''),
	('00000000-0000-0000-0000-000000000000', '8949013c-73f1-4a1a-a2b5-159b118fd9b3', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-01 18:50:52.404484+00', ''),
	('00000000-0000-0000-0000-000000000000', '0040a303-2b33-4c21-a57d-5556bbc4af93', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 08:21:53.181253+00', ''),
	('00000000-0000-0000-0000-000000000000', '525d9f3d-12b1-4b78-a01b-20eddd56f3e5', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 08:21:53.192753+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe0f455f-1f97-4c6d-abe9-4383f73c44eb', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 09:30:48.293331+00', ''),
	('00000000-0000-0000-0000-000000000000', '64e6bca0-cc73-40ad-85e9-b8938ae66915', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 09:30:48.294863+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a63ecb96-5301-4a21-8bc7-e4041497d2b8', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 12:59:37.621715+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f493639-5abe-44ba-a578-79570e02a645', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 12:59:37.636528+00', ''),
	('00000000-0000-0000-0000-000000000000', '90f1dd75-1023-44b3-8ea9-6f93a346a448', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 14:04:15.827365+00', ''),
	('00000000-0000-0000-0000-000000000000', '00d68975-c68d-4eea-bdcd-dfd45a7cb60c', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 14:04:15.829585+00', ''),
	('00000000-0000-0000-0000-000000000000', '23e93418-3e46-417b-b421-e1c62a7954f3', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 19:59:25.603111+00', ''),
	('00000000-0000-0000-0000-000000000000', '74c3be5e-c5fe-4d6d-95e0-8648216f2b50', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 19:59:25.604996+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ad6d699-3b3b-432c-a581-3dfc3550c946', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 21:18:58.190521+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca386c15-4484-4302-9301-1108c5b13a00', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-02 21:18:58.192582+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6bb5d3b-be06-4e6d-a97e-42fb638b7d67', '{"action":"token_refreshed","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-03 06:24:40.091455+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e5e67d2-aadc-434f-b162-99b2a713b920', '{"action":"token_revoked","actor_id":"c6733d7a-94af-4d95-98f6-fca75c9a4199","actor_username":"devel@rmorgado.ch","actor_via_sso":false,"log_type":"token"}', '2025-02-03 06:24:40.097581+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '86280987-144c-4bc1-b0b7-6b5766366622', 'authenticated', 'authenticated', 'sara.corradini@deepcloud.swiss', '$2a$10$f6n.XDZWoByPFXF6WmDHS.fFfqNvzO2H.Vv.PKccbVjE.GyWxWzQi', '2025-01-29 13:34:24.959518+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-01-29 13:45:25.094181+00', '{"provider": "email", "providers": ["email"], "userroles": ["ADMIN"]}', '{"email_verified": true}', NULL, '2025-01-29 13:34:24.956319+00', '2025-01-30 06:16:54.718578+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', 'authenticated', 'authenticated', 'devel@rmorgado.ch', '$2a$10$9a8QySGmDWBh3fzCfqf.Q.WzWEz.eehuIEHrwLqp1CDfcLzMJMt9e', '2025-01-29 13:29:48.011541+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-01-31 17:58:13.165808+00', '{"provider": "email", "providers": ["email"], "userroles": ["ADMIN"]}', '{"email_verified": true}', NULL, '2025-01-29 13:29:48.005521+00', '2025-02-03 06:24:40.108474+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('c6733d7a-94af-4d95-98f6-fca75c9a4199', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', '{"sub": "c6733d7a-94af-4d95-98f6-fca75c9a4199", "email": "devel@rmorgado.ch", "email_verified": false, "phone_verified": false}', 'email', '2025-01-29 13:29:48.007427+00', '2025-01-29 13:29:48.007489+00', '2025-01-29 13:29:48.007489+00', '13f1284c-943e-416f-be36-93ab8dbfe60f'),
	('86280987-144c-4bc1-b0b7-6b5766366622', '86280987-144c-4bc1-b0b7-6b5766366622', '{"sub": "86280987-144c-4bc1-b0b7-6b5766366622", "email": "sara.corradini@deepcloud.swiss", "email_verified": false, "phone_verified": false}', 'email', '2025-01-29 13:34:24.957636+00', '2025-01-29 13:34:24.957687+00', '2025-01-29 13:34:24.957687+00', '32f0b31e-05e6-4f07-98ac-db2816c2627c');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('a7844243-f3f3-4429-9fa9-66bc88e99514', '86280987-144c-4bc1-b0b7-6b5766366622', '2025-01-29 13:45:25.094254+00', '2025-01-30 06:16:54.727057+00', NULL, 'aal1', NULL, '2025-01-30 06:16:54.726945', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', '85.195.223.147', NULL),
	('322f1ab7-97b3-4b98-9b63-6e0b241ed74b', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', '2025-01-31 11:58:34.852796+00', '2025-01-31 22:40:50.97443+00', NULL, 'aal1', NULL, '2025-01-31 22:40:50.974314', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', '178.38.20.107', NULL),
	('bf3f00bb-5536-49d8-ade2-55d3c34a0daa', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', '2025-01-31 17:58:13.166252+00', '2025-02-03 06:24:40.111722+00', NULL, 'aal1', NULL, '2025-02-03 06:24:40.111646', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', '85.195.223.147', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('a7844243-f3f3-4429-9fa9-66bc88e99514', '2025-01-29 13:45:25.09688+00', '2025-01-29 13:45:25.09688+00', 'password', '8752acd7-0682-47bc-9976-4eafca20c4dd'),
	('322f1ab7-97b3-4b98-9b63-6e0b241ed74b', '2025-01-31 11:58:34.873248+00', '2025-01-31 11:58:34.873248+00', 'password', '5eaf4b99-5127-4cc1-8e97-3920bde2a18b'),
	('bf3f00bb-5536-49d8-ade2-55d3c34a0daa', '2025-01-31 17:58:13.16976+00', '2025-01-31 17:58:13.16976+00', 'password', '213340f6-ae17-4a6e-a3f6-a63d1ca11421');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 5, 'UmfMNsP-f5xAGXucfLShfg', '86280987-144c-4bc1-b0b7-6b5766366622', true, '2025-01-29 13:45:25.095146+00', '2025-01-30 06:16:54.705416+00', NULL, 'a7844243-f3f3-4429-9fa9-66bc88e99514'),
	('00000000-0000-0000-0000-000000000000', 6, 'FH3uqkT8oLgmbpyidu5NOw', '86280987-144c-4bc1-b0b7-6b5766366622', false, '2025-01-30 06:16:54.715814+00', '2025-01-30 06:16:54.715814+00', 'UmfMNsP-f5xAGXucfLShfg', 'a7844243-f3f3-4429-9fa9-66bc88e99514'),
	('00000000-0000-0000-0000-000000000000', 7, 'x_DcdMKDDy-Xq9_WyQoQ7w', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 11:58:34.85864+00', '2025-01-31 16:40:41.981545+00', NULL, '322f1ab7-97b3-4b98-9b63-6e0b241ed74b'),
	('00000000-0000-0000-0000-000000000000', 8, 'a1PamPjUtx_hF6c-Jb9rKA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 16:40:41.986761+00', '2025-01-31 17:53:55.254175+00', 'x_DcdMKDDy-Xq9_WyQoQ7w', '322f1ab7-97b3-4b98-9b63-6e0b241ed74b'),
	('00000000-0000-0000-0000-000000000000', 10, 'Kw2j0vepS2-mvzAgTDGayQ', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 17:58:13.167819+00', '2025-01-31 19:04:00.327672+00', NULL, 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 9, '3f1nhBFfvCeumSsIpjS4LQ', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 17:53:55.255273+00', '2025-01-31 19:17:14.3667+00', 'a1PamPjUtx_hF6c-Jb9rKA', '322f1ab7-97b3-4b98-9b63-6e0b241ed74b'),
	('00000000-0000-0000-0000-000000000000', 11, '3ZFOQVJCQDlDu08WIVkO7w', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 19:04:00.328302+00', '2025-01-31 20:05:40.107468+00', 'Kw2j0vepS2-mvzAgTDGayQ', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 13, 'R589y0gmjBKOwKCGTGTydA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 20:05:40.108534+00', '2025-01-31 21:05:51.417057+00', '3ZFOQVJCQDlDu08WIVkO7w', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 14, 'dKIHavOPP5RhsZQO2oatAA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 21:05:51.417651+00', '2025-01-31 22:06:03.077112+00', 'R589y0gmjBKOwKCGTGTydA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 12, 'EUuHKFu8O5r4o34tP_Xrmw', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 19:17:14.36796+00', '2025-01-31 22:40:50.96989+00', '3f1nhBFfvCeumSsIpjS4LQ', '322f1ab7-97b3-4b98-9b63-6e0b241ed74b'),
	('00000000-0000-0000-0000-000000000000', 16, 'hSxFBSIxIgE2XLkAT4QopA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', false, '2025-01-31 22:40:50.971906+00', '2025-01-31 22:40:50.971906+00', 'EUuHKFu8O5r4o34tP_Xrmw', '322f1ab7-97b3-4b98-9b63-6e0b241ed74b'),
	('00000000-0000-0000-0000-000000000000', 15, '7F9_uauSvgJG-56LsqS8bA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 22:06:03.078608+00', '2025-01-31 23:06:00.753918+00', 'dKIHavOPP5RhsZQO2oatAA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 17, 'v9RXMlgbw0NOnCk27HDn5g', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-01-31 23:06:00.754614+00', '2025-02-01 00:14:18.836882+00', '7F9_uauSvgJG-56LsqS8bA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 18, 'wdDTto33l8elxGvgGD7PvA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-01 00:14:18.838107+00', '2025-02-01 16:15:03.609308+00', 'v9RXMlgbw0NOnCk27HDn5g', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 19, 'YjnTWN7b37lheaqQYvmghQ', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-01 16:15:03.61682+00', '2025-02-01 18:50:52.404995+00', 'wdDTto33l8elxGvgGD7PvA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 20, '-F3Uyav9tODzIIDUFGBmBA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-01 18:50:52.406917+00', '2025-02-02 08:21:53.193338+00', 'YjnTWN7b37lheaqQYvmghQ', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 21, 'Lsf-5o5mJNOcUFF23nY4xw', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-02 08:21:53.200947+00', '2025-02-02 09:30:48.295357+00', '-F3Uyav9tODzIIDUFGBmBA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 22, 'xWIru1UG7YOeKw9XG2r5oA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-02 09:30:48.296495+00', '2025-02-02 12:59:37.637128+00', 'Lsf-5o5mJNOcUFF23nY4xw', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 23, 'mC7ueyc6LWGR10aNypxiJw', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-02 12:59:37.642865+00', '2025-02-02 14:04:15.830309+00', 'xWIru1UG7YOeKw9XG2r5oA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 24, '2YC3anBzxk1-pdQ3PPHWqA', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-02 14:04:15.832585+00', '2025-02-02 19:59:25.605494+00', 'mC7ueyc6LWGR10aNypxiJw', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 25, 'jO4JKl13xTB_nt4vOdTr6Q', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-02 19:59:25.607806+00', '2025-02-02 21:18:58.193628+00', '2YC3anBzxk1-pdQ3PPHWqA', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 26, 'Vn0X-gXw2DDYqFILImi8eg', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', true, '2025-02-02 21:18:58.19602+00', '2025-02-03 06:24:40.101566+00', 'jO4JKl13xTB_nt4vOdTr6Q', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa'),
	('00000000-0000-0000-0000-000000000000', 27, 'RvFlwnna8unDstnQipfvrQ', 'c6733d7a-94af-4d95-98f6-fca75c9a4199', false, '2025-02-03 06:24:40.105186+00', '2025-02-03 06:24:40.105186+00', 'Vn0X-gXw2DDYqFILImi8eg', 'bf3f00bb-5536-49d8-ade2-55d3c34a0daa');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: event_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."events" ("id", "created_at", "title", "description", "date", "banner", "slug") VALUES
	('a1206dd3-0d09-49a7-a2f6-70f20e83cce1', '2025-01-31 17:55:59.530847+00', '{"de": "Summer Party 2024"}', '{"de": "Nice"}', '2024-08-31', 'https://qrcmwtdmxghtzybnguwz.supabase.co/storage/v1/object/public/events/a1206dd3-0d09-49a7-a2f6-70f20e83cce1/banner.png', 'summer-party-2024'),
	('611cb2d9-4f9a-40e5-a615-f1ad418a3355', '2025-01-31 17:44:33.603959+00', '{"de": "40 Jahre Abacus"}', '{"de": "Es wird gefeiert!"}', '2025-05-16', 'https://qrcmwtdmxghtzybnguwz.supabase.co/storage/v1/object/public/events/611cb2d9-4f9a-40e5-a615-f1ad418a3355/banner.jpg', '40-years-abacus');


--
-- Data for Name: event_timeline_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."event_timeline_category" ("id", "created_at", "title", "color", "event_id", "icon") VALUES
	('95129dd2-3982-4fa7-99cb-25ee0b507c3d', '2025-01-31 21:03:28.433161+00', '{"de": "ADULTS"}', 'red', '611cb2d9-4f9a-40e5-a615-f1ad418a3355', 'mdi-account'),
	('8e852dde-c56c-4e63-be8e-9672c6b27fb7', '2025-01-31 21:05:43.803336+00', '{"de": "Food"}', 'orange', '611cb2d9-4f9a-40e5-a615-f1ad418a3355', 'mdi-food-fork-drink');


--
-- Data for Name: event_timeline; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."event_timeline" ("id", "created_at", "title", "locations", "time_start", "time_end", "note", "icon", "event_id", "category") VALUES
	('9937354c-4917-411e-822c-1c696876d7b6', '2025-01-31 21:58:26.910302+00', '{"de":"nice"}', '{}', '10:10', '10:10', '{"de":"asdas"}', 'mdi-bug', 'a1206dd3-0d09-49a7-a2f6-70f20e83cce1', '95129dd2-3982-4fa7-99cb-25ee0b507c3d');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "updated_at", "first_name", "last_name", "avatar_url") VALUES
	('c6733d7a-94af-4d95-98f6-fca75c9a4199', NULL, 'Ricardo', 'Coelho', NULL),
	('86280987-144c-4bc1-b0b7-6b5766366622', NULL, NULL, NULL, NULL);


--
-- Data for Name: event_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: parking_lots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('avatars', 'avatars', NULL, '2025-01-29 12:17:26.70534+00', '2025-01-29 12:17:26.70534+00', false, false, NULL, NULL, NULL),
	('events', 'events', NULL, '2025-01-31 19:06:21.893059+00', '2025-01-31 19:06:21.893059+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('32e545c6-a656-4778-9b73-b83d41047595', 'events', 'a1206dd3-0d09-49a7-a2f6-70f20e83cce1/.emptyFolderPlaceholder', NULL, '2025-01-31 19:11:01.378086+00', '2025-01-31 19:11:01.378086+00', '2025-01-31 19:11:01.378086+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-01-31T19:11:02.000Z", "contentLength": 0, "httpStatusCode": 200}', '75e601f8-c7b4-48f9-a6c2-c51ceb00858a', NULL, '{}'),
	('c309df88-9e51-443b-aea0-3cc88f0e6424', 'events', 'a1206dd3-0d09-49a7-a2f6-70f20e83cce1/banner.png', NULL, '2025-01-31 19:06:58.56268+00', '2025-01-31 19:11:09.199672+00', '2025-01-31 19:06:58.56268+00', '{"eTag": "\"18c9c568adbd1bf4ede9d37846f37d38\"", "size": 352985, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-01-31T19:11:10.000Z", "contentLength": 352985, "httpStatusCode": 200}', 'af05a2dd-f1b2-4851-85c6-1d237ea9af94', NULL, NULL),
	('f6bef834-b48a-45c2-a4c2-ac0734f74500', 'events', '611cb2d9-4f9a-40e5-a615-f1ad418a3355/banner.jpg', NULL, '2025-01-31 19:17:47.917119+00', '2025-01-31 19:23:58.457988+00', '2025-01-31 19:17:47.917119+00', '{"eTag": "\"103cb0909d6d9f1d345db805a7c00fc1\"", "size": 36727, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-01-31T19:23:59.000Z", "contentLength": 36727, "httpStatusCode": 200}', '4ca31a0e-48f7-4831-ad0e-77abfcd8b56b', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 27, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
