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

  function getEventTimelinesByCategory(
    category: EventTimelineCategory,
    range = [0, 100]
  ) {
    const filters: FindFilter[] = [['category', 'eq', category]];
    return getEventTimelines('*', filters, range);
  }

  function getEventTimelineById(EventTimelineId: string) {
    return findById<EventTimeline>('event_timeline', EventTimelineId, '*');
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

  return {
    getEventTimelines,
    getEventTimelineById,
    createEventTimeline,
    updateEventTimeline,
    removeEventTimeline,
    getEventTimelinesByCategory
  };
}
