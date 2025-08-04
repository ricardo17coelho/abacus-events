<template>
  <EventFilePicker multiple @update:selected="onSave">
    <template #activator="{ props: ActivatorProps }">
      <UiHtmlEditorToolbarBtn
        v-tooltip="t('ui_lib.html_editor.image')"
        :class="{ 'is-active': editor?.isActive('link') }"
        icon="mdi-image"
        v-bind="ActivatorProps"
      />
    </template>
  </EventFilePicker>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { useI18n } from 'vue-i18n';
import EventFilePicker from '../../../../../src/components/event/EventFilePicker.vue';
import UiHtmlEditorToolbarBtn from '../UiHtmlEditorToolbarBtn.vue';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();

const { t } = useI18n();

function onSave(attachments?: string | string[]) {
  if (attachments && Array.isArray(attachments) && attachments.length) {
    attachments.forEach((attachment) => {
      props.editor
        ?.chain()
        .focus()
        .setImage({ src: attachment, alt: 'Image' })
        .run();
    });
  }
}
</script>
