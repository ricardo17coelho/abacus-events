import { computed, onBeforeUnmount, onMounted, type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useDateCountdown(targetDate: Ref<string> | string) {
  const timeRemaining = ref(getTimeRemaining());
  const { t } = useI18n();

  let intervalId: number | undefined;

  function getTimeRemaining(): number {
    const now = new Date().getTime();
    const target = new Date(
      typeof targetDate === 'string' ? targetDate : targetDate.value,
    ).getTime();
    return Math.max(0, target - now);
  }

  const formattedTime = computed(() => {
    const total = timeRemaining.value;
    if (total <= 0) return t('labels.today');

    const seconds = Math.floor(total / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
  });

  function update() {
    timeRemaining.value = getTimeRemaining();
  }

  onMounted(() => {
    intervalId = window.setInterval(update, 1000);
  });

  onBeforeUnmount(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return { formattedTime };
}
