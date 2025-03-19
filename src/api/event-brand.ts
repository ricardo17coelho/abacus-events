import useApi from '@/composables/api';
import type { EventBrand, EventBrandBanner } from '@/api/types/EventBrand';
import type { FindFilter } from '@/api/types/QueryTypes.ts';

export default function useApiEventBrand() {
  const { find, findById, create, update, remove, removeByMatchQuery } =
    useApi();

  const eventBrandSelect = `
      *,
      banners:event_brand_banners(
       ...event_attachments(*)
      )
  `;

  async function getEventBrands(
    select = eventBrandSelect,
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    return find<EventBrand>('event_brand', filters, select, range);
  }

  async function getEventBrandByEventId(eventId: string, range = [0, 100]) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    const { data, error } = await getEventBrands(
      eventBrandSelect,
      filters,
      range,
    );
    if (data && data.length) {
      return { data: data[0], error };
    }
    return { data: undefined, error };
  }

  async function getEventBrandById(id: string) {
    return findById<EventBrand>('event_brand', id, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async function createEventBrand(form: Record<string, any>) {
    return create<EventBrand>('event_brand', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async function updateEventBrand(id: string, form: Record<string, any>) {
    return update<EventBrand>('event_brand', {
      id,
      ...form,
    });
  }

  async function removeEventBrand(id: string) {
    return remove('event_brand', id);
  }

  // Banners
  async function getEventBrandBanners(
    select = '*',
    filters: FindFilter[] = [],
    range = [0, 100],
  ) {
    return find<EventBrandBanner>(
      'event_brand_banners',
      filters,
      select,
      range,
    );
  }

  async function getEventBrandBannerByEventId(
    eventId: string,
    range = [0, 100],
  ) {
    const filters: FindFilter[] = [['event_id', 'eq', eventId]];
    return getEventBrandBanners('*', filters, range);
  }

  async function getEventBrandBannerById(EventBrandBannerId: string) {
    return findById<EventBrandBanner>(
      'event_brand_banners',
      EventBrandBannerId,
      '*',
    );
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async function createEventBrandBanner(form: Record<string, any>) {
    return create<EventBrandBanner>('event_brand_banners', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async function updateEventBrandBanner(id: string, form: Record<string, any>) {
    return update<EventBrandBanner>('event_brand_banners', {
      id,
      ...form,
    });
  }

  async function removeEventBrandBanner(id: string) {
    return remove('event_brand_banners', id);
  }

  function removeEventBrandBannerByEventAttachmentId(
    eventId: string,
    eventAttachmentId: string,
  ) {
    return removeByMatchQuery('event_brand_banners', {
      ['event_id']: eventId,
      ['event_attachment_id']: eventAttachmentId,
    });
  }

  return {
    getEventBrands,
    getEventBrandByEventId,
    getEventBrandById,
    createEventBrand,
    updateEventBrand,
    removeEventBrand,
    // banners
    getEventBrandBanners,
    getEventBrandBannerByEventId,
    getEventBrandBannerById,
    createEventBrandBanner,
    updateEventBrandBanner,
    removeEventBrandBanner,
    removeEventBrandBannerByEventAttachmentId,
  };
}
