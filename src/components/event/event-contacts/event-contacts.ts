import type { EventContactTypes } from '@/api/types/EventContact.ts';

export function getEventContactIcon(i: EventContactTypes) {
  switch (i) {
    case 'PHONE':
      return 'mdi-phone';
    case 'EMAIL':
      return 'mdi-email';
  }
}
