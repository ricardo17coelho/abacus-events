import useApi from '@/composables/api';
import type {
  EventSchedule,
  EventScheduleItem,
} from '@/api/types/EventSchedule.ts';
import type { FindOrder } from '@/api/types/QueryTypes.ts';

export default function useApiEventSchedule() {
  const { find, findById, create, update, remove } = useApi();

  const baseSelect = `
      *,
      items:event_schedule_items(*)
  `;

  function getEventSchedules(range = [0, 10]) {
    const orders: FindOrder[] = [
      ['order', { referencedTable: 'event_schedule_items', ascending: true }],
    ];
    return find<EventSchedule>('event_schedule', [], baseSelect, range, orders);
  }

  function getEventScheduleById(EventScheduleId: string) {
    const orders: FindOrder[] = [
      ['order', { referencedTable: 'event_schedule_items', ascending: true }],
    ];

    return findById<EventSchedule>(
      'event_schedule',
      EventScheduleId,
      baseSelect,
      'id',
      [],
      orders,
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventSchedule(form: Record<string, any>) {
    return create<EventSchedule>('event_schedule', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventSchedule(id: string, form: Record<string, any>) {
    return update<EventSchedule>('event_schedule', {
      id,
      ...form,
    });
  }

  function removeEventSchedule(id: string) {
    return remove('event_schedule', id);
  }

  // Event Schedule Items

  function getEventScheduleItems(range = [0, 10]) {
    return find<EventScheduleItem>('event_schedule_items', [], '*', range);
  }

  function getEventScheduleItemById(EventScheduleId: string) {
    return findById<EventScheduleItem>(
      'event_schedule_items',
      EventScheduleId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventScheduleItem(form: Record<string, any>) {
    return create<EventScheduleItem>('event_schedule_items', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventScheduleItem(id: string, form: Record<string, any>) {
    return update<EventScheduleItem>('event_schedule_items', {
      id,
      ...form,
    });
  }

  function removeEventScheduleItem(id: string) {
    return remove('event_schedule_items', id);
  }

  return {
    // Event Schedule
    getEventSchedules,
    getEventScheduleById,
    createEventSchedule,
    updateEventSchedule,
    removeEventSchedule,
    // Event Schedule Items
    getEventScheduleItems,
    getEventScheduleItemById,
    createEventScheduleItem,
    updateEventScheduleItem,
    removeEventScheduleItem,
  };
}
