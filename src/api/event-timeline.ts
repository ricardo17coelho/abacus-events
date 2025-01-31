import useApi from '@/composables/api';
import {
  type EventTimeline,
  type EventTimelineCategory
} from './types/EventTimeline';
import type { FindFilter } from './types/QueryTypes';

export default function useApiEventTimeline() {
  const { find, findById, create, update, remove } = useApi();

  function getEventTimelines(
    select = '*',
    filters: FindFilter[] = [],
    range = [0, 100]
  ) {
    return find<EventTimeline>(
      'event_timeline',
      filters,
      select,
      range,
      [['time_start', true]],
      {
        count: 'exact'
      }
    );
  }

  function getEventTimelinesByCategoryId(
    eventId: string,
    category: string,
    range = [0, 100]
  ) {
    const filters: FindFilter[] = [
      ['event_id', 'eq', eventId],
      ['category', 'eq', category]
    ];
    return getEventTimelines('*', filters, range);
  }

  function getEventTimelineById(id: string) {
    return findById<EventTimeline>('event_timeline', id, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventTimeline(form: Record<string, any>) {
    return create<EventTimeline>('event_timeline', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventTimeline(id: string, form: Record<string, any>) {
    return update<EventTimeline>('event_timeline', {
      id,
      ...form
    });
  }

  function removeEventTimeline(id: string) {
    return remove('event_timeline', id);
  }

  // EventTimelineCategory

  function getEventTimelineCategories(
    select = '*',
    filters: FindFilter[] = [],
    range = [0, 100]
  ) {
    return find<EventTimelineCategory>(
      'event_timeline_category',
      filters,
      select,
      range,
      [],
      {
        count: 'exact'
      }
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
      ...form
    });
  }

  function removeEventTimelineCategory(id: string) {
    return remove('event_timeline_category', id);
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
    removeEventTimelineCategory
  };
}
