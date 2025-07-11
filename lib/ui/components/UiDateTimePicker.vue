<template>
  <v-text-field
    v-model="display"
    clearable
    label="Select Date & Time"
    prepend-icon="mdi-calendar"
    readonly
    @click="menu = true"
    @click:clear="onClear"
  >
    <v-menu
      v-model="menu"
      activator="parent"
      :close-on-content-click="false"
      max-width="320"
      min-width="320"
      transition="scale-transition"
    >
      <v-card>
        <v-card-item>
          <!-- Tabs -->
          <div class="d-flex justify-center align-center">
            <v-btn-toggle
              v-model="tab"
              base-color="surface-light"
              class="bg-surface-light pa-1 ma-2 w-100"
              color="primary"
              density="comfortable"
            >
              <v-btn class="text-none flex-1-1-0" text="Date" value="date" />

              <v-btn class="text-none flex-1-1-0" text="Time" value="time" />
            </v-btn-toggle>
          </div>
          <v-window v-model="tab">
            <v-window-item value="date">
              <v-date-picker
                v-model="date"
                class="pa-0"
                color="primary"
                hide-header
              />
            </v-window-item>

            <v-window-item value="time">
              <v-time-picker
                v-model="time"
                class="pa-0"
                color="primary"
                format="24hr"
                title=""
                width="100%"
              />
            </v-window-item>
          </v-window>
        </v-card-item>

        <v-card-actions>
          <v-btn text @click="onClear">Clear</v-btn>
          <v-spacer />
          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!date && !time"
            variant="flat"
            @click="onSave"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-text-field>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const model = defineModel({
  type: [String, Object] as PropType<string | Date | undefined>,
  default: undefined,
});

const date = ref<Date | null>(null);
const time = ref<string | null>(null);
const tab = ref<'date' | 'time'>('date');
const menu = ref(false);

const display = computed(() => {
  if (!date.value || !time.value) return '';

  const [hours, minutes] = time.value.split(':').map(Number);
  const fullDate = new Date(date.value);
  fullDate.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(fullDate);
});

// Watch modelValue to initialize picker
watch(
  () => model.value,
  (newVal) => {
    if (!newVal) return;

    const dt = new Date(newVal);
    date.value = dt;
    time.value = dt.toTimeString().slice(0, 5); // "HH:MM"
  },
  { immediate: true },
);

function onSave() {
  if (!date.value || !time.value) return;

  const [hours, minutes] = time.value.split(':').map(Number);
  const fullDate = new Date(date.value);
  fullDate.setHours(hours, minutes, 0, 0);

  model.value = fullDate.toISOString();
  menu.value = false;
}

function onClear() {
  date.value = null;
  time.value = null;
  model.value = undefined;
}
</script>
