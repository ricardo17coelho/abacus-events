import type { TitleI18n } from '@/types/TitleI18n';

export const EVENT_FEATURE_TYPE = {
  PARKING: 'PARKING',
  PROGRAM: 'PROGRAM',
  GUEST_LIST: 'GUEST_LIST',
  SHUTTLE_PLAN: 'SHUTTLE_PLAN',
  CONTACTS: 'CONTACTS',
  FILES: 'FILES',
} as const;

export type EventFeatureTypes =
  (typeof EVENT_FEATURE_TYPE)[keyof typeof EVENT_FEATURE_TYPE];

export type EventFeature = {
  id: string;
  created_at: string;
  event_id: string;
  title?: TitleI18n;
  description?: TitleI18n;
  icon?: string;
  feature_id: EventFeatureTypes;
  enabled: boolean;
};
