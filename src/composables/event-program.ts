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

  function parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const base = new Date();
    return new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      hours,
      minutes,
    );
  }

  function getDurationInMinutes(start: string, end: string): number {
    const startTime = parseTime(start);
    const endTime = parseTime(end);

    // Handle "next day" end time (e.g., 01:00 after 22:00)
    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    return (endTime.getTime() - startTime.getTime()) / 60000; // in minutes
  }

  function sortTimelinesByStartAndDuration(
    items: EventTimeline[],
  ): EventTimeline[] {
    return [...items].sort((a, b) => {
      const startA = parseTime(a.time_start);
      const startB = parseTime(b.time_start);

      if (startA.getTime() !== startB.getTime()) {
        return startA.getTime() - startB.getTime(); // primary: start time ascending
      }

      const durationA = getDurationInMinutes(a.time_start, a.time_end);
      const durationB = getDurationInMinutes(b.time_start, b.time_end);

      return durationA - durationB; // secondary: duration ascending
    });
  }

  const sortedItems = computed(() =>
    sortTimelinesByStartAndDuration(items.value),
  );

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
