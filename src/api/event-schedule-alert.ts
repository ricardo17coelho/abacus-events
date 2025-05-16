import useApi from '@/composables/api';
import type { EventScheduleAlert } from '@/api/types/EventSchedule.ts';

export default function useApiEventScheduleAlert() {
  const { find, findById, create, update, remove } = useApi();

  function getEventScheduleAlerts(range = [0, 10]) {
    return find<EventScheduleAlert>('event_schedule_alerts', [], '*', range);
  }

  function getEventScheduleAlertById(EventScheduleAlertId: string) {
    return findById<EventScheduleAlert>(
      'event_schedule_alerts',
      EventScheduleAlertId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventScheduleAlert(form: Record<string, any>) {
    return create<EventScheduleAlert>('event_schedule_alerts', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventScheduleAlert(id: string, form: Record<string, any>) {
    return update<EventScheduleAlert>('event_schedule_alerts', {
      id,
      ...form,
    });
  }

  function removeEventScheduleAlert(id: string) {
    return remove('event_schedule_alerts', id);
  }

  return {
    getEventScheduleAlerts,
    getEventScheduleAlertById,
    createEventScheduleAlert,
    updateEventScheduleAlert,
    removeEventScheduleAlert,
  };
}
