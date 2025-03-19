import useApi from '@/composables/api';
import type { EventShuttleAlert } from '@/api/types/EventShuttlePlan';

export default function useApiEventShuttleAlert() {
  const { find, findById, create, update, remove } = useApi();

  function getEventShuttleAlerts(range = [0, 10]) {
    return find<EventShuttleAlert>('event_shuttle_plan_alerts', [], '*', range);
  }

  function getEventShuttleAlertById(EventShuttleAlertId: string) {
    return findById<EventShuttleAlert>(
      'event_shuttle_plan_alerts',
      EventShuttleAlertId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventShuttleAlert(form: Record<string, any>) {
    return create<EventShuttleAlert>('event_shuttle_plan_alerts', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventShuttleAlert(id: string, form: Record<string, any>) {
    return update<EventShuttleAlert>('event_shuttle_plan_alerts', {
      id,
      ...form,
    });
  }

  function removeEventShuttleAlert(id: string) {
    return remove('event_shuttle_plan_alerts', id);
  }

  return {
    getEventShuttleAlerts,
    getEventShuttleAlertById,
    createEventShuttleAlert,
    updateEventShuttleAlert,
    removeEventShuttleAlert,
  };
}
