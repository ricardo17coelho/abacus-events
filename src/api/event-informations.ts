import useApi from '@/composables/api';
import type { EventInformation } from '@/api/types/EventInformation';

export default function useApiEventInformations() {
  const { find, findById, create, update, remove } = useApi();

  function getEventInformations(range = [0, 10]) {
    return find<EventInformation>('event_informations', [], '*', range);
  }

  function getEventInformationById(id: string) {
    return findById<EventInformation>('event_informations', id, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventInformation(form: Record<string, any>) {
    return create<EventInformation>('event_informations', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventInformation(id: string, form: Record<string, any>) {
    return update<EventInformation>('event_informations', {
      id,
      ...form,
    });
  }

  function removeEventInformation(id: string) {
    return remove('event_informations', id);
  }

  return {
    getEventInformations,
    getEventInformationById,
    createEventInformation,
    updateEventInformation,
    removeEventInformation,
  };
}
