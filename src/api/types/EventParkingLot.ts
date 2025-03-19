import type { ParkingLot } from '@/api/types/ParkingLot.ts';

export interface EventParkingLot extends ParkingLot {
  parking_lot_id: string;
  event_id: string;
}
