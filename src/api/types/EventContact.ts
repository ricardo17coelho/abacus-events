export const EVENT_CONTACT_TYPES = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
} as const;

export type EventContactTypes =
  (typeof EVENT_CONTACT_TYPES)[keyof typeof EVENT_CONTACT_TYPES];

export type EventContact = {
  id: string;
  created_at: string;
  type: EventContactTypes;
  value: string;
  description: string;
};
