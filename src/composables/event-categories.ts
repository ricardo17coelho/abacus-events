import {
  EVENT_TIMELINE_CATEGORY,
  type EventTimelineCategory
} from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';

export default function useProgramCategories() {
  const { t } = useI18n();

  function getIconByCategory(category: EventTimelineCategory) {
    switch (category) {
      case 'KIDS':
        return 'mdi-balloon';
      case 'ADULTS':
        return 'mdi-account-multiple';
      case 'FOOD':
        return 'mdi-food';
      case 'BEVERAGE':
        return 'mdi-beer';
      default:
        return '';
    }
  }

  const categories = computed(() =>
    Object.values(EVENT_TIMELINE_CATEGORY).map((i) => {
      return {
        value: i,
        title: t(`categories.${i}`),
        icon: getIconByCategory(i)
      };
    })
  );

  return {
    categories
  };
}
