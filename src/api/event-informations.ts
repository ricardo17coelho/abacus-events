import useApi from '@/composables/api';
import type {
  EventInformation,
  EventInformationCategory,
} from '@/api/types/EventInformation';
import type { FindFilter } from '@/api/types/QueryTypes.ts';

export default function useApiEventInformations() {
  const { find, findById, create, update, remove } = useApi();

  function getEventInformations(filters: FindFilter[] = [], range = [0, 100]) {
    return find<EventInformation>('event_informations', filters, '*', range);
  }

  function getEventInformationById(id: string) {
    return findById<EventInformation>('event_informations', id, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventInformation(form: Record<string, any>) {
    return create<EventInformation>('event_informations', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateEventInformation(id: string, form: Record<string, any>) {
    return update<EventInformation>('event_informations', {
      id,
      ...form,
    });
  }

  function removeEventInformation(id: string) {
    return remove('event_informations', id);
  }

  function getEventInformationsByCategoryId(
    eventId: string,
    category: string,
    range = [0, 100],
  ) {
    const filters: FindFilter[] = [
      ['event_id', 'eq', eventId],
      ['category_id', 'eq', category],
    ];
    return getEventInformations(filters, range);
  }

  // EventInformationCategory
  function getEventInformationsCategories(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    const select = '*';

    return find<EventInformationCategory>(
      'event_informations_category',
      filters,
      select,
      range,
      [],
      {
        count: 'exact',
      },
    );
  }

  function getEventInformationCategoryById(id: string) {
    return findById<EventInformationCategory>(
      'event_informations_category',
      id,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createEventInformationCategory(form: Record<string, any>) {
    return create<EventInformationCategory>(
      'event_informations_category',
      form,
    );
  }

  function updateEventInformationCategory(
    id: string,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    form: Record<string, any>,
  ) {
    return update<EventInformationCategory>('event_informations_category', {
      id,
      ...form,
    });
  }

  function removeEventInformationCategory(id: string) {
    return remove('event_informations_category', id);
  }

  return {
    getEventInformations,
    getEventInformationById,
    createEventInformation,
    updateEventInformation,
    removeEventInformation,
    getEventInformationsByCategoryId,
    // EventInformationCategory
    getEventInformationsCategories,
    getEventInformationCategoryById,
    createEventInformationCategory,
    updateEventInformationCategory,
    removeEventInformationCategory,
  };
}
