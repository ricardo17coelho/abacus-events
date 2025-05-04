import useApi from '@/composables/api';
import {
  type EventTimeline,
  type EventTimelineCategory,
  type EventTimelinePerson,
} from './types/EventTimeline';
import type { FindFilter } from './types/QueryTypes';

export default function useApiEventTimeline() {
  const { find, findById, create, update, remove } = useApi();

  const baseSelect = `
      *,
      persons:event_timeline_persons(
       *,
       ...event_persons(*)
      )
  `;

  function getEventTimelines(
    select = baseSelect,
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    return find<EventTimeline>(
      'event_timeline',
      filters,
      select,
      range,
      [['time_start', true]],
      {
        count: 'exact',
      },
    );
  }

  function getEventTimelinesByCategoryId(
    eventId: string,
    category: string,
    range = [0, 100],
  ) {
    const filters: FindFilter[] = [
      ['event_id', 'eq', eventId],
      ['category', 'eq', category],
    ];
    return getEventTimelines(baseSelect, filters, range);
  }

  function getEventTimelineById(id: string) {
    return findById<EventTimeline>('event_timeline', id, baseSelect);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventTimeline(form: Record<string, any>) {
    return create<EventTimeline>('event_timeline', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventTimeline(id: string, form: Record<string, any>) {
    return update<EventTimeline>('event_timeline', {
      id,
      ...form,
    });
  }

  function removeEventTimeline(id: string) {
    return remove('event_timeline', id);
  }

  // EventTimelineCategory
  function getEventTimelineCategories(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    const select = '*';

    return find<EventTimelineCategory>(
      'event_timeline_category',
      filters,
      select,
      range,
      [],
      {
        count: 'exact',
      },
    );
  }

  function getEventTimelineCategoryById(id: string) {
    return findById<EventTimelineCategory>('event_timeline_category', id, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventTimelineCategory(form: Record<string, any>) {
    return create<EventTimelineCategory>('event_timeline_category', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventTimelineCategory(id: string, form: Record<string, any>) {
    return update<EventTimelineCategory>('event_timeline_category', {
      id,
      ...form,
    });
  }

  function removeEventTimelineCategory(id: string) {
    return remove('event_timeline_category', id);
  }

  // EventTimelinePerson
  function getEventTimelinePersons(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    const select = '*';

    return find<EventTimelinePerson>(
      'event_timeline_persons',
      filters,
      select,
      range,
      [],
      {
        count: 'exact',
      },
    );
  }

  function getEventTimelinePersonById(id: string) {
    return findById<EventTimelinePerson>('event_timeline_persons', id, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventTimelinePerson(form: Record<string, any>) {
    return create<EventTimelinePerson>('event_timeline_persons', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventTimelinePerson(id: string, form: Record<string, any>) {
    return update<EventTimelinePerson>('event_timeline_persons', {
      id,
      ...form,
    });
  }

  function removeEventTimelinePerson(id: string, key = 'id') {
    return remove('event_timeline_persons', id, key);
  }

  return {
    getEventTimelines,
    getEventTimelineById,
    createEventTimeline,
    updateEventTimeline,
    removeEventTimeline,
    getEventTimelinesByCategoryId,
    // EventTimelineCategory
    getEventTimelineCategories,
    getEventTimelineCategoryById,
    createEventTimelineCategory,
    updateEventTimelineCategory,
    removeEventTimelineCategory,
    // EventTimelinePerson
    getEventTimelinePersons,
    getEventTimelinePersonById,
    createEventTimelinePerson,
    updateEventTimelinePerson,
    removeEventTimelinePerson,
  };
}
