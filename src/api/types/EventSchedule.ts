import type { TitleI18n } from '@/types/TitleI18n.ts';

export const ALERT_TYPES = {
  warning: 'warning',
  info: 'info',
  error: 'error',
  success: 'success',
} as const;

export type AlertTypes = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

export type EventScheduleItem = {
  id: string;
  created_at: string;
  event_schedule_id: number;
  text: string;
  text_link: string;
  order: number;
};

export type EventSchedule = {
  id: string;
  created_at: string;
  event_id: number;
  title: TitleI18n;
  description?: TitleI18n;
  icon?: string;
  items: EventScheduleItem[];
};

export type EventScheduleAlert = {
  id: string;
  created_at: string;
  event_id: number;
  type: AlertTypes;
  icon: string;
  message: TitleI18n;
  title: TitleI18n;
};
