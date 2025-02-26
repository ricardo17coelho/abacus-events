import type { TitleI18n } from '@/types/TitleI18n';

export type ParkingLot = {
  id: string;
  created_at: string;
  title: TitleI18n;
  location?: string;
  location_url?: string;
  total_slots: number;
  filled_slots: number;
};

export const PARKING_LOT_STATUS = {
  FREE: 'FREE',
  ALMOST_FULL: 'ALMOST_FULL',
  FULL: 'FULL',
} as const;

export type ParkingLotStatus =
  (typeof PARKING_LOT_STATUS)[keyof typeof PARKING_LOT_STATUS];
