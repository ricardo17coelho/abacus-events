<template>
  <VScaleTransition>
    <VFab
      v-show="model"
      v-scroll:[scrollContainer]="onScroll"
      app
      color="primary"
      elevation="8"
      fixed
      icon="mdi-arrow-up"
      location="bottom end"
      style="width: calc(100% - 20px); bottom: 56px"
      variant="elevated"
      v-bind="$attrs"
      @click="toTop"
    ></VFab>
  </VScaleTransition>
</template>

<script lang="ts" setup>
import { VFab, VScaleTransition } from 'vuetify/components';
import { useGoTo } from 'vuetify';

const props = defineProps({
  scrollContainer: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({
  type: Boolean,
  default: false,
});

const goTo = useGoTo();

function onScroll(e: Event) {
  if (typeof window === 'undefined') return;
  const target = e.target as HTMLInputElement;
  const top = window.scrollY || target.scrollTop || 0;
  model.value = top > 60;
}
function toTop() {
  goTo(0, { container: props.scrollContainer });
}
</script>
