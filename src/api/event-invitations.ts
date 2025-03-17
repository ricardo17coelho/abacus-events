import useApi from '@/composables/api';
import { supabase } from '@/services/supabase';
import {
  type EventInvitation,
  type EventInvitationStatus,
} from './types/EventInvitation.ts';
import type { FindFilter } from '@/api/types/QueryTypes.ts';

export default function useApiEventInvitations() {
  const { update, find, create, findById } = useApi();

  const acceptInvitation = (invitationId: string) => {
    return supabase.rpc('accept_invitation', {
      invitation_id: invitationId,
    });
  };

  const declineInvitation = (invitationId: string) => {
    return update(
      'event_invitations',
      {
        invitation_id: invitationId,
        status: 'DECLINED',
      },
      'invitation_id',
    );
  };

  const getUserInvitationsByStatus = (
    userEmail: string,
    status: EventInvitationStatus,
  ) => {
    const filters: FindFilter[] = [
      ['email', 'eq', userEmail],
      ['status', 'eq', status],
    ];
    const select = `
    *,
      role:role_id(
        *
      )
    `;
    return find<EventInvitation>('event_invitations', filters, select);
  };

  const getInvitationsById = (invitationId: string) => {
    const select = `
    *,
      company:company_id(
        *
      ),
      role:role_id(
        *
      )
    `;
    return findById<EventInvitation>('event_invitations', invitationId, select);
  };

  const getInvitationsByEventId = (eventId: string) => {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];

    const select = `
    *,
      role:role_id(
        *
      )
    `;
    return find<EventInvitation>('event_invitations', filters, select);
  };

  const createInvitation = ({
    email,
    roleId,
    eventId,
    message,
  }: {
    email: string;
    roleId: string;
    eventId: string;
    message?: string;
  }) => {
    return create<EventInvitation>('event_invitations', {
      email,
      role_id: roleId,
      event_id: eventId,
      message,
    });
  };

  const sendInvitationEmail = (
    invitationId: string,
    toEmail: string[],
    message?: string,
  ) => {
    const baseUrl = window.location.origin;
    const invitationLink = `${baseUrl}/invitation/${invitationId}`;

    return supabase.functions.invoke('resend', {
      body: JSON.stringify({
        from: 'Abacus Events <no-reply@abacus-events.ch>',
        to: toEmail,
        subject: 'You are invited!',
        content: `You have been invited. Please click on the following link to accept the invitation: ${invitationLink}`,
        html: `
        <p>
          You have been invited.
        </p>
        <br />
        <p>
          ${message}
        </p>
        <br />
        <p>
          Please click on the following link to accept the invitation:
        </p>
        <a href="${invitationLink}">${invitationLink}</a>`,
      }),
    });
  };

  return {
    acceptInvitation,
    declineInvitation,
    getUserInvitationsByStatus,
    createInvitation,
    sendInvitationEmail,
    getInvitationsById,
    getInvitationsByEventId,
  };
}
