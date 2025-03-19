import type { TitleI18n } from '@/types/TitleI18n.ts';

export const SHUTTLE_PLAN_DIRECTION = {
  OUTWARD: 'OUTWARD',
  RETURN: 'RETURN',
} as const;

export type ShuttlePlanDirection =
  (typeof SHUTTLE_PLAN_DIRECTION)[keyof typeof SHUTTLE_PLAN_DIRECTION];

export const ALERT_TYPES = {
  warning: 'warning',
  info: 'info',
  error: 'error',
  success: 'success',
} as const;

export type AlertTypes = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

export type EventShuttlePlan = {
  id: string;
  created_at: string;
  event_id: number;
  direction: ShuttlePlanDirection;
  location: string;
  location_link: string;
  order: number;
};

export type EventShuttleAlert = {
  id: string;
  created_at: string;
  event_id: number;
  type: AlertTypes;
  icon: string;
  message: TitleI18n;
  title: TitleI18n;
};
