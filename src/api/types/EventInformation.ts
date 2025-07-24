import type { Profile } from '@/api/types/Profile.ts';
import type { TitleI18n } from '@/types/TitleI18n.ts';

export type EventInformation = {
  id: string;
  event_id: string;
  created_at: string;
  author: Profile;
  title: TitleI18n;
  content: TitleI18n;
  img_path?: string;
};
