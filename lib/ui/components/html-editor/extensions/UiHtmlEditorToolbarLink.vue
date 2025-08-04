<template>
  <UiHtmlEditorToolbarBtn
    v-tooltip="t('ui_lib.html_editor.link')"
    :class="{ 'is-active': editor?.isActive('link') }"
    icon="mdi-link-variant"
    @click="openDialog"
  />

  <UiDialog
    v-model="showDialog"
    max-width="400"
    :title="t('ui_lib.html_editor.add_link')"
  >
    <template #content>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="linkText"
            hide-details="auto"
            :label="t('ui_lib.html_editor.link_text')"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="linkUrl"
            hide-details="auto"
            :label="t('ui_lib.html_editor.link_url')"
            type="url"
          />
        </v-col>
      </v-row>
    </template>
    <template #actions>
      <v-spacer />
      <VBtnSecondary @click="showDialog = false">
        {{ t('actions.cancel') }}
      </VBtnSecondary>
      <VBtnPrimary @click="applyLink">{{ t('actions.ok') }} </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Editor } from '@tiptap/vue-3';
import UiHtmlEditorToolbarBtn from '../UiHtmlEditorToolbarBtn.vue';
import UiDialog from '../../UiDialog.vue';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();
const { t } = useI18n();

const showDialog = ref(false);
const linkText = ref('');
const linkUrl = ref('');

function openDialog() {
  const { editor } = props;
  const prevUrl = editor.getAttributes('link')?.href;
  const selectedText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    ' ',
  );

  linkText.value = selectedText || '';
  linkUrl.value = prevUrl || '';
  showDialog.value = true;
}

function applyLink() {
  const { editor } = props;
  showDialog.value = false;

  if (!linkUrl.value) {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  if (linkText.value) {
    editor
      .chain()
      .focus()
      .insertContent(
        `<a href="${linkUrl.value}" target="_blank">${linkText.value}</a>`,
      )
      .run();
  } else {
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl.value })
      .run();
  }

  linkText.value = '';
  linkUrl.value = '';
}
</script>
