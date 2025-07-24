import type { TitleI18n } from '@/types/TitleI18n';
import type { ParkingLot } from '@/api/types/ParkingLot.ts';
import type { EventFeature } from '@/api/types/EventFeature.ts';
import type { EventBrand } from './EventBrand.ts';
import type { EventFile } from './EventFile.ts';
import type { EventContact } from '@/api/types/EventContact.ts';
import type {
  EventSchedule,
  EventScheduleAlert,
} from '@/api/types/EventSchedule.ts';
import type { EventPerson } from '@/api/types/EventPerson.ts';
import type { EventInformation } from '@/api/types/EventInformation.ts';

export type Event = {
  id: string;
  created_at: string;
  title: TitleI18n;
  subtitle: TitleI18n;
  description: TitleI18n;
  date: string;
  brand: EventBrand;
  slug: string;
  parking_lots: ParkingLot[];
  features: EventFeature[];
  public: boolean;
  files: EventFile[];
  contacts: EventContact[];
  schedule: EventSchedule[];
  persons: EventPerson[];
  schedule_alerts: EventScheduleAlert[];
  informations: EventInformation[];
};
