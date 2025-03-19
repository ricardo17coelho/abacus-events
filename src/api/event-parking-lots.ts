import useApi from '@/composables/api';
import type { EventParkingLot } from '@/api/types/EventParkingLot';

export default function useApiEventParkingLot() {
  const { find, findById, create, update, removeByMatchQuery } = useApi();

  function getEventParkingLots(range = [0, 10]) {
    return find<EventParkingLot>('event_parking_lots', [], '*', range);
  }

  function getEventParkingLotById(EventParkingLotId: string) {
    return findById<EventParkingLot>(
      'event_parking_lots',
      EventParkingLotId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventParkingLot(form: Record<string, any>) {
    return create<EventParkingLot>('event_parking_lots', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventParkingLot(id: string, form: Record<string, any>) {
    return update<EventParkingLot>('event_parking_lots', {
      id,
      ...form,
    });
  }

  function removeEventParkingLot(eventId: string, parkingLotId: string) {
    return removeByMatchQuery('event_parking_lots', {
      ['event_id']: eventId,
      ['parking_lot_id']: parkingLotId,
    });
  }

  return {
    getEventParkingLots,
    getEventParkingLotById,
    createEventParkingLot,
    updateEventParkingLot,
    removeEventParkingLot,
  };
}
