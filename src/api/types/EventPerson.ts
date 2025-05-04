import type { TitleI18n } from '@/types/TitleI18n.ts';

export type EventPerson = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  event_id: string;
  avatar_url?: string;
  bio?: TitleI18n;
  description?: TitleI18n;
};
