import type { TitleI18n } from '@/types/TitleI18n';
import type { ParkingLot } from '@/api/types/ParkingLot.ts';
import type { EventFeature } from '@/api/types/EventFeature.ts';
import type { EventLayout } from '@/api/types/EventLayout.ts';

export type EventBrandBanner = {
  path: string;
  url: string;
};

export type EventBrand = {
  event_id: string;
  created_at: string;
  color_primary: string;
  color_secondary: string;
  banners: EventBrandBanner[];
  logo: string;
  layout: EventLayout;
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
  features: EventFeature[];
};
