export type ParkingLot = {
  id: string;
  created_at: string;
  name: string;
  location?: string;
  total_slots: number;
  filled_slots: number;
};

export const PARKING_LOT_STATUS = {
  FREE: 'FREE',
  ALMOST_FULL: 'ALMOST_FULL',
  FULL: 'FULL'
} as const;

export type ParkingLotStatus =
  (typeof PARKING_LOT_STATUS)[keyof typeof PARKING_LOT_STATUS];
