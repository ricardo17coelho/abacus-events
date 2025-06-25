export const CONTACT_TYPES = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
} as const;

export type ContactTypes = (typeof CONTACT_TYPES)[keyof typeof CONTACT_TYPES];

export type Contact = {
  id: string;
  created_at: string;
  type: ContactTypes;
  value: string;
  description: string;
};
