import type { TitleI18n } from '@/types/TitleI18n';

export type Event = {
  id: string;
  created_at: string;
  title: TitleI18n;
  description: TitleI18n;
  date: string;
  banner: string;
  slug: string;
};
