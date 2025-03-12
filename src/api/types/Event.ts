import type { TitleI18n } from '@/types/TitleI18n';
import type { ParkingLot } from '@/api/types/ParkingLot.ts';

export type EventBrand = {
  event_id: string;
  created_at: string;
  color_primary: string;
  color_secondary: string;
  banner: string;
  logo: string;
};

export type Event = {
  id: string;
  created_at: string;
  title: TitleI18n;
  description: TitleI18n;
  date: string;
  brand: EventBrand;
  slug: string;
  parking_lots: ParkingLot[];
};
