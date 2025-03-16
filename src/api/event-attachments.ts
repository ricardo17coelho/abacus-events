import useApi from '@/composables/api';
import type { EventAttachment } from '@/api/types/EventAttachment';
import type { FindFilter } from '@/api/types/QueryTypes.ts';

export default function useApiEventAttachment() {
  const { find, findById, create, update, remove } = useApi();

  function getEventAttachments(
    select = '*',
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    return find<EventAttachment>('event_attachments', filters, select, range);
  }

  function getEventAttachmentByEventId(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    return getEventAttachments('*', filters, range);
  }

  function getEventAttachmentById(EventAttachmentId: string) {
    return findById<EventAttachment>(
      'event_attachments',
      EventAttachmentId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventAttachment(form: Record<string, any>) {
    return create<EventAttachment>('event_attachments', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventAttachment(id: string, form: Record<string, any>) {
    return update<EventAttachment>('event_attachments', {
      id,
      ...form,
    });
  }

  function removeEventAttachment(id: string) {
    return remove('event_attachments', id);
  }

  return {
    getEventAttachments,
    getEventAttachmentByEventId,
    getEventAttachmentById,
    createEventAttachment,
    updateEventAttachment,
    removeEventAttachment,
  };
}
