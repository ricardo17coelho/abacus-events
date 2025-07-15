import useApi from '@/composables/api';
import type { Event } from './types/Event';
import { validate as isValidUUID } from 'uuid';
import type { FindFilter, FindOrder } from '@/api/types/QueryTypes.ts';

export default function useApiEvents() {
  const { find, findById, create, update, remove, count } = useApi();

  const baseSelect = `
    *,
    features:event_features(*),
    brand:event_brand(
      *,
      banners:event_brand_banners(
       ...event_attachments(*)
      )
    ),
    files:event_files(
      visible,
      file_id:id,
      ...event_attachments(*)
    ),
    parking_lots:event_parking_lots(
      *,
      ...parking_lots(*)
    ),
    contacts:event_contacts(*),
    schedule:event_schedule(
      *,
      items:event_schedule_items(*)
    ),
    schedule_alerts:event_schedule_alerts(*),
    persons:event_persons(*)
  `;

  function getEvents(
    select = baseSelect,
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    const orders: FindOrder[] = [['date', { ascending: false }]];

    return find<Event>('events', filters, select, range, orders);
  }

  function getEventsPublic(range = [0, 100]) {
    const filters: FindFilter[] = [['public', 'eq', true]];
    return getEvents(baseSelect, filters, range);
  }

  function getEventById(eventId: string) {
    const orders: FindOrder[] = [
      [
        'order',
        { referencedTable: 'schedule.event_schedule_items', ascending: true },
      ],
    ];

    return findById<Event>('events', eventId, baseSelect, 'id', [], orders);
  }

  function getEventBySlug(slug: string) {
    const orders: FindOrder[] = [
      [
        'order',
        { referencedTable: 'schedule.event_schedule_items', ascending: true },
      ],
    ];

    return findById<Event>('events', slug, baseSelect, 'slug', [], orders);
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
      ...form,
    });
  }

  function removeEvent(id: string) {
    return remove('events', id);
  }

  function getEventsCount() {
    return count('events');
  }

  return {
    getEvents,
    getEventsPublic,
    getEventByIdOrSlug,
    createEvent,
    updateEvent,
    removeEvent,
    getEventsCount,
  };
}
