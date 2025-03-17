import type { ValueOf } from '@/utils/valueOf';

export const EVENT_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
} as const;

export type EventInvitationStatus = ValueOf<typeof EVENT_INVITATION_STATUS>;

export type EventInvitation = {
  id: string;
  created_at: string;
  status: EventInvitationStatus;
  event_id: string;
  expiry_date?: string;
  email: string;
  message?: string;
};
