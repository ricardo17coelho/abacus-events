import useApi from '@/composables/api';
import type { EventPerson } from '@/api/types/EventPerson';

export default function useApiEventPerson() {
  const { find, findById, create, update, remove } = useApi();

  function getEventPersons(range = [0, 10]) {
    return find<EventPerson>('event_persons', [], '*', range);
  }

  function getEventPersonById(EventPersonId: string) {
    return findById<EventPerson>('event_persons', EventPersonId, '*');
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
    getEventPersonById,
    createEventPerson,
    updateEventPerson,
    removeEventPerson,
  };
}
