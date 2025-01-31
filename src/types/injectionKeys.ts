import type { InjectionKey, Ref } from 'vue';
import type { Event } from '@/api/types/Event.ts';

export const CURRENT_EVENT_KEY: InjectionKey<Ref<Event | undefined>> =
  Symbol('CURRENT_EVENT_KEY');
