<template>
  <v-timeline
    align="start"
    density="compact"
    dot-color="primary"
    side="end"
    size="x-small"
    truncate-line="both"
  >
    <v-timeline-item
      v-for="(item, idx) in items"
      :key="`${idx}-return`"
      icon="mdi-arrow-down"
    >
      <div>
        <div>
          <a class="link-external" :href="item.link" target="_blank">
            {{ item.text }}
          </a>
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped></style>
