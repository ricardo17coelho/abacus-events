<template>
  <div v-bind="$attrs">
    <slot :greeting="t(greetingMsg)" name="greeting">
      <span class="text-medium-emphasis mr-2 font-weight-medium">
        {{ t(greetingMsg) }}
      </span>
    </slot>
    <slot :display-name="displayName" name="displayName">
      <span class="font-weight-bold">
        {{ displayName }}
      </span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
// composables
import { useI18n } from 'vue-i18n';

defineProps({
  displayName: {
    type: String,
    default: undefined,
  },
});

const { t } = useI18n();

const currentTime = ref();

function timer() {
  currentTime.value = new Date();
}

timer();
setInterval(timer, 1000);

const greetingMsg = computed(() => {
  const hrs = currentTime.value?.getHours();
  let greet = 'ui_lib.greeting.';

  if (hrs >= 4 && hrs < 12) greet += 'good_morning';
  else if (hrs >= 11 && hrs < 17) greet += 'good_afternoon';
  else if (hrs >= 17 && hrs < 23) greet += 'good_evening';
  else greet += 'hello';

  return greet;
});
</script>
