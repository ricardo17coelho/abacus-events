import type { EventFeatureTypes } from '@/api/types/EventFeature.ts';
import type { Event } from '@/api/types/Event.ts';

export function hasEventFeature(event: Event, eventFeature: EventFeatureTypes) {
  return event.features.map((i) => i.feature_id).includes(eventFeature);
}
