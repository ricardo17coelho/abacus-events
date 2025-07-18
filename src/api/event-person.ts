import useApi from '@/composables/api';
import type { EventPerson } from '@/api/types/EventPerson';
import type { FindFilter, FindOrder } from '@/api/types/QueryTypes.ts';

export default function useApiEventPerson() {
  const { find, findById, create, update, remove } = useApi();

  const baseSelect = `
      *
  `;

  function getEventPersons(
    select = baseSelect,
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    const orders: FindOrder[] = [['first_name', { ascending: true }]];

    return find<EventPerson>('event_persons', filters, select, range, orders);
  }

  function getEventPersonById(EventPersonId: string) {
    return findById<EventPerson>('event_persons', EventPersonId, '*');
  }

  function getEventPersonsByEventId(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    return getEventPersons(baseSelect, filters, range);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventPerson(form: Record<string, any>) {
    return create<EventPerson>('event_persons', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventPerson(id: string, form: Record<string, any>) {
    return update<EventPerson>('event_persons', {
      id,
      ...form,
    });
  }

  function removeEventPerson(id: string) {
    return remove('event_persons', id);
  }

  return {
    getEventPersons,
    getEventPersonsByEventId,
    getEventPersonById,
    createEventPerson,
    updateEventPerson,
    removeEventPerson,
  };
}
