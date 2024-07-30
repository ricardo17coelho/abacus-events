import useApi from '@/composables/api';
import type { ParkingLot } from '@/api/types/ParkingLot';

export default function useApiParkingLot() {
  const { find, findById, create, update, remove } = useApi();

  function getParkingLots() {
    return find('parking_lots', [], '*');
  }

  function getParkingLotById(ParkingLotId: string) {
    return findById('parking_lots', ParkingLotId, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createParkingLot(form: Record<string, any>) {
    return create<ParkingLot>('parking_lots', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateParkingLot(id: string, form: Record<string, any>) {
    return update<ParkingLot>('parking_lots', {
      id,
      ...form
    });
  }

  function removeParkingLot(id: string) {
    return remove('parking_lots', id);
  }

  return {
    getParkingLots,
    getParkingLotById,
    createParkingLot,
    updateParkingLot,
    removeParkingLot
  };
}
