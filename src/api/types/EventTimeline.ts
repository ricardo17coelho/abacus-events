import type { TitleI18n } from '@/types/TitleI18n';

export type EventTimelineCategory = {
  id: string;
  created_at: string;
  title: TitleI18n;
  color: string;
  icon: string;
};

export type EventTimeline = {
  id: string;
  event_id: string;
  created_at: string;
  title: TitleI18n;
  locations?: string[];
  time_start?: string;
  time_end?: string;
  note?: TitleI18n;
  icon?: string;
  category: string;
};
