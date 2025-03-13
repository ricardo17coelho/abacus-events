import useApi from '@/composables/api';
import type { EventFeature } from '@/api/types/EventFeature';

export default function useApiEventFeature() {
  const { find, findById, create, update, remove } = useApi();

  function getEventFeatures(range = [0, 10]) {
    return find<EventFeature>('event_features', [], '*', range);
  }

  function getEventFeatureById(EventFeatureId: string) {
    return findById<EventFeature>('event_features', EventFeatureId, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventFeature(form: Record<string, any>) {
    return create<EventFeature>('event_features', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventFeature(id: string, form: Record<string, any>) {
    return update<EventFeature>('event_features', {
      id,
      ...form,
    });
  }

  function removeEventFeature(id: string) {
    console.warn('removeEventFeature', id);
    return remove('event_features', id);
  }

  return {
    getEventFeatures,
    getEventFeatureById,
    createEventFeature,
    updateEventFeature,
    removeEventFeature,
  };
}
