import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import type {
  EventInformation,
  EventInformationCategory,
} from '@/api/types/EventInformation.ts';
import useApiEventInformations from '@/api/event-informations.ts';

export default function useEventInformations() {
  const currentEvent = requireInjection(CURRENT_EVENT_KEY);

  const { t } = useI18n();
  const currentCategoryFilter = ref();

  const items = ref<EventInformation[]>([]);

  const categories = ref<EventInformationCategory[]>([]);

  const { getEventInformationsCategories, getEventInformationsByCategoryId } =
    useApiEventInformations();

  async function initialFetch() {
    if (!currentEvent.value) return;
    const { data, error } = await getEventInformationsCategories(
      currentEvent.value?.id,
    );

    if (error) return;
    if (data) {
      categories.value = data;
      if (categories.value.length > 0) {
        currentCategoryFilter.value = categories.value[0].id;
      }
    }
  }

  void initialFetch();

  const isLoading = ref(false);
  const fetchData = async () => {
    if (!currentEvent.value) return;
    items.value = [];
    isLoading.value = true;
    const { data, error } = await getEventInformationsByCategoryId(
      currentEvent.value.id,
      currentCategoryFilter.value,
    );
    if (error) {
      toast.error(t('errors.error_occurred'));
      return;
    }
    if (data) {
      items.value = data;
    }
    isLoading.value = false;
  };

  watch(
    () => currentCategoryFilter.value,
    async (newValue) => {
      if (newValue) {
        void fetchData();
      }
    },
  );

  return {
    items,
    currentCategoryFilter,
    categories,
    isLoading,
    fetchData,
  };
}
