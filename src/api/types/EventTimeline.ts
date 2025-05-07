import type { TitleI18n } from '@/types/TitleI18n';
import type { EventPerson } from '@/api/types/EventPerson.ts';

export type EventTimelineCategory = {
  id: string;
  created_at: string;
  title: TitleI18n;
  color: string;
  icon: string;
};

export interface EventTimelinePerson extends EventPerson {
  event_person_id: string;
}

export type EventTimeline = {
  id: string;
  event_id: string;
  created_at: string;
  title: TitleI18n;
  locations?: TitleI18n[];
  time_start?: string;
  time_end?: string;
  note?: TitleI18n;
  icon?: string;
  category: string;
  persons: EventTimelinePerson[];
};
