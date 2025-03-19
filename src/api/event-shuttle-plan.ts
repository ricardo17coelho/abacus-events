import useApi from '@/composables/api';
import type { EventShuttlePlan } from '@/api/types/EventShuttlePlan';

export default function useApiEventShuttlePlan() {
  const { find, findById, create, update, remove } = useApi();

  function getEventShuttlePlans(range = [0, 10]) {
    return find<EventShuttlePlan>('event_shuttle_plan', [], '*', range);
  }

  function getEventShuttlePlanById(EventShuttlePlanId: string) {
    return findById<EventShuttlePlan>(
      'event_shuttle_plan',
      EventShuttlePlanId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventShuttlePlan(form: Record<string, any>) {
    return create<EventShuttlePlan>('event_shuttle_plan', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventShuttlePlan(id: string, form: Record<string, any>) {
    return update<EventShuttlePlan>('event_shuttle_plan', {
      id,
      ...form,
    });
  }

  function removeEventShuttlePlan(id: string) {
    return remove('event_shuttle_plan', id);
  }

  return {
    getEventShuttlePlans,
    getEventShuttlePlanById,
    createEventShuttlePlan,
    updateEventShuttlePlan,
    removeEventShuttlePlan,
  };
}
