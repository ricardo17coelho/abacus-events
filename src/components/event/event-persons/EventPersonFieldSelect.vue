<template>
  <v-select
    chips
    :items="itemsFormatted"
    :label="t('labels.persons')"
    name="field-event-persons"
    v-bind="$attrs"
  >
    <template #item="{ props: ItemProps, item }">
      <v-list-item v-bind="ItemProps">
        <template #prepend>
          <UiAvatarUser
            border
            color="white"
            :logo="item.raw.avatar_url"
            :name="item.title"
          />
        </template>
      </v-list-item>
    </template>
    <template #selection="{ item }">
      {{ item.title }}
    </template>
  </v-select>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import type { EventPerson } from '@/api/types/EventPerson.ts';
import useApiEventPerson from '@/api/event-person.ts';
import { UiAvatarUser } from '@lib/ui';
import { getUserFullName } from '@/utils/profile.ts';

const props = defineProps({
  eventId: {
    type: String,
    default: undefined,
  },
});

const { t } = useI18n();

const items = ref<EventPerson[]>([]);

const { getEventPersons, getEventPersonsByEventId } = useApiEventPerson();

async function onGetAll() {
  let res;
  if (props.eventId) {
    res = await getEventPersonsByEventId(props.eventId);
  } else {
    res = await getEventPersons();
  }

  if (res.error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (res.data) {
      items.value = res.data;
    }
  }
}
onGetAll();

const itemsFormatted = computed(() =>
  items.value.map((i) => {
    return {
      ...i,
      value: i.id,
      title: getUserFullName(i),
    };
  }),
);
</script>
