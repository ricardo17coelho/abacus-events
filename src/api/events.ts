import useApi from '@/composables/api';
import type { Event } from './types/Event';
import { validate as isValidUUID } from 'uuid';

export default function useApiEvents() {
  const { find, findById, create, update, remove } = useApi();

  function getEvents(range = [0, 10]) {
    return find<Event>('events', [], '*', range);
  }

  function getEventById(eventId: string) {
    return findById<Event>('events', eventId, '*');
  }

  function getEventBySlug(slug: string) {
    return findById<Event>('events', slug, '*', 'slug');
  }

  function getEventByIdOrSlug(id: string) {
    if (isValidUUID(id)) {
      return getEventById(id);
    }
    return getEventBySlug(id);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEvent(form: Record<string, any>) {
    return create<Event>('events', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEvent(id: string, form: Record<string, any>) {
    return update<Event>('events', {
      id,
      ...form
    });
  }

  function removeEvent(id: string) {
    return remove('events', id);
  }

  return {
    getEvents,
    getEventById,
    getEventBySlug,
    getEventByIdOrSlug,
    createEvent,
    updateEvent,
    removeEvent
  };
}
