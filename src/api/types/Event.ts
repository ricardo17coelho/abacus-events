import type { TitleI18n } from '@/types/TitleI18n';
import type { ParkingLot } from '@/api/types/ParkingLot.ts';
import type { EventFeature } from '@/api/types/EventFeature.ts';
import type { EventBrand } from './EventBrand.ts';
import type { EventFile } from './EventFile.ts';
import type { EventContact } from '@/api/types/EventContact.ts';
import type {
  EventShuttleAlert,
  EventShuttlePlan,
} from '@/api/types/EventShuttlePlan.ts';
import type { EventPerson } from '@/api/types/EventPerson.ts';

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
  shuttle_plan: EventShuttlePlan[];
  persons: EventPerson[];
  shuttle_plan_alerts: EventShuttleAlert[];
};
