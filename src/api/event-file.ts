import useApi from '@/composables/api';
import type { EventFile } from '@/api/types/EventFile.ts';
import type { FindFilter } from '@/api/types/QueryTypes.ts';

export default function useApiEventFile() {
  const { find, findById, create, update, remove } = useApi();

  const baseSelect = `
      ...event_attachments(*)
  `;

  function getEventFiles(
    select = baseSelect,
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    return find<EventFile>('event_files', filters, select, range);
  }

  function getEventFilesByEventId(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    return getEventFiles(baseSelect, filters, range);
  }

  function getEventFileById(EventFileId: string) {
    return findById<EventFile>('event_files', EventFileId, baseSelect);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventFile(form: Record<string, any>) {
    return create<EventFile>('event_files', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventFile(id: string, form: Record<string, any>) {
    return update<EventFile>('event_files', {
      id,
      ...form,
    });
  }

  function removeEventFile(id: string) {
    return remove('event_files', id);
  }

  return {
    getEventFiles,
    getEventFilesByEventId,
    getEventFileById,
    createEventFile,
    updateEventFile,
    removeEventFile,
  };
}
