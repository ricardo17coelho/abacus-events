import type {
  EventTimeline,
  EventTimelineCategory,
} from '@/api/types/EventTimeline.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useApiEventTimeline from '@/api/event-timeline.ts';
import { toast } from 'vue-sonner';
import useApiProgramTimeline from '@/api/event-timeline.ts';
import { useI18n } from 'vue-i18n';

export default function useEventProgram() {
  const currentEvent = requireInjection(CURRENT_EVENT_KEY);

  const { t } = useI18n();
  const currentCategoryFilter = ref();

  const items = ref<EventTimeline[]>([]);

  const sortedItems = computed(() => {
    return items.value.slice().sort((a, b) => {
      if (!a || !a.time_start || !b || !b.time_start) return;
      const aStart = parseFloat(a.time_start.replace('.', '')) / 100;
      const bStart = parseFloat(b.time_start.replace('.', '')) / 100;
      if (aStart !== bStart) return aStart - bStart;
      if (!a || !a.time_end || !b || !b.time_end) return;
      const aEnd = parseFloat(a.time_end.replace('.', '')) / 100;
      const bEnd = parseFloat(b.time_end.replace('.', '')) / 100;
      return aEnd - bEnd;
    });
  });

  const categories = ref<EventTimelineCategory[]>([]);

  const { getEventTimelineCategories } = useApiEventTimeline();

  async function initialFetch() {
    if (!currentEvent.value) return;
    const { data, error } = await getEventTimelineCategories(
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

  const { getEventTimelinesByCategoryId } = useApiProgramTimeline();

  const isLoading = ref(false);
  const fetchData = async () => {
    if (!currentEvent.value) return;
    items.value = [];
    isLoading.value = true;
    const { data, error } = await getEventTimelinesByCategoryId(
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
    sortedItems,
    currentCategoryFilter,
    categories,
    isLoading,
    fetchData,
  };
}
