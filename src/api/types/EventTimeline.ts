import type { TitleI18n } from '@/types/TitleI18n';

export const EVENT_TIMELINE_CATEGORY = {
  KIDS: 'KIDS',
  ADULTS: 'ADULTS',
  FOOD: 'FOOD',
  BEVERAGE: 'BEVERAGE'
} as const;

export type EventTimelineCategory =
  (typeof EVENT_TIMELINE_CATEGORY)[keyof typeof EVENT_TIMELINE_CATEGORY];

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
  category: EventTimelineCategory;
};
