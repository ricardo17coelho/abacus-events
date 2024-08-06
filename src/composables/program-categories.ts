import {
  PROGRAM_TIMELINE_CATEGORY,
  type ProgramTimelineCategory
} from '@/api/types/ProgramTimeline';
import { useI18n } from 'vue-i18n';

export default function useProgramCategories() {
  const { t } = useI18n();

  function getIconByCategory(category: ProgramTimelineCategory) {
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
    Object.values(PROGRAM_TIMELINE_CATEGORY).map((i) => {
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
