import useApi from '@/composables/api';
import type { EventContact } from '@/api/types/EventContact';

export default function useApiEventContact() {
  const { find, findById, create, update, remove } = useApi();

  function getEventContacts(range = [0, 10]) {
    return find<EventContact>('event_contacts', [], '*', range);
  }

  function getEventContactById(EventContactId: string) {
    return findById<EventContact>('event_contacts', EventContactId, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventContact(form: Record<string, any>) {
    return create<EventContact>('event_contacts', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventContact(id: string, form: Record<string, any>) {
    return update<EventContact>('event_contacts', {
      id,
      ...form,
    });
  }

  function removeEventContact(id: string) {
    return remove('event_contacts', id);
  }

  return {
    getEventContacts,
    getEventContactById,
    createEventContact,
    updateEventContact,
    removeEventContact,
  };
}
