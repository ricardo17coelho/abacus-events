import useApi from '@/composables/api';
import type { ParkingLot } from '@/api/types/ParkingLot';
import type { FindFilter } from '@/api/types/QueryTypes.ts';

export default function useApiParkingLot() {
  const { find, findById, create, update, remove, count } = useApi();

  function getParkingLots(
    select = '*',
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    return find<ParkingLot>('parking_lots', filters, select, range);
  }

  function getParkingLotsByEventId(eventId: string, range = [0, 10]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    return getParkingLots('*', filters, range);
  }

  function getParkingLotById(ParkingLotId: string) {
    return findById<ParkingLot>('parking_lots', ParkingLotId, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createParkingLot(form: Record<string, any>) {
    return create<ParkingLot>('parking_lots', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateParkingLot(id: string, form: Record<string, any>) {
    return update<ParkingLot>('parking_lots', {
      id,
      ...form,
    });
  }

  function removeParkingLot(id: string) {
    return remove('parking_lots', id);
  }

  function getParkingLotsCount() {
    return count('parking_lots');
  }

  return {
    getParkingLots,
    getParkingLotsByEventId,
    getParkingLotById,
    createParkingLot,
    updateParkingLot,
    removeParkingLot,
    getParkingLotsCount,
  };
}
