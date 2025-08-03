<template>
  <div v-if="editor">
    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.bold')"
      :class="{ 'is-active': editor.isActive('bold') }"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      icon="mdi-format-bold"
      @click="editor.chain().focus().toggleBold().run()"
    />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.italic')"
      :class="{ 'is-active': editor.isActive('italic') }"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      icon="mdi-format-italic"
      @click="editor.chain().focus().toggleItalic().run()"
    />

    <v-divider class="mr-2 mb-2" vertical />

    <UiHtmlEditorToolbarMenu icon="mdi-format-header-1" :items="headingItems" />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.bullet_list')"
      :class="{ 'is-active': editor.isActive('bulletList') }"
      icon="mdi-format-list-bulleted"
      @click="editor.chain().focus().toggleBulletList().run()"
    />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.ordered_list')"
      :class="{ 'is-active': editor.isActive('orderedList') }"
      icon="mdi-format-list-numbered"
      @click="editor.chain().focus().toggleOrderedList().run()"
    />

    <v-divider class="mr-2 mb-2" vertical />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.blockquote')"
      :class="{ 'is-active': editor.isActive('blockquote') }"
      icon="mdi-format-quote-open-outline"
      @click="editor.chain().focus().toggleBlockquote().run()"
    />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.clear_style')"
      icon="mdi-backspace-outline"
      @click="editor.chain().focus().unsetAllMarks().run()"
    />

    <v-divider class="mr-2 mb-2" vertical />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.undo')"
      :disabled="!editor.can().chain().focus().undo().run()"
      icon="mdi-undo"
      @click="editor.chain().focus().undo().run()"
    />

    <UiHtmlEditorToolbarBtn
      v-tooltip="t('ui_lib.html_editor.redo')"
      :disabled="!editor.can().chain().focus().redo().run()"
      icon="mdi-redo"
      @click="editor.chain().focus().redo().run()"
    />

    <v-divider class="mr-2 mb-2" vertical />
    <UiHtmlEditorToolbarTableMenu :editor="editor" />

    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
// tiptap components
import type { Editor } from '@tiptap/vue-3';
// components
import UiHtmlEditorToolbarBtn from './UiHtmlEditorToolbarBtn.vue';
import UiHtmlEditorToolbarMenu from './UiHtmlEditorToolbarMenu.vue';
// composables
import { useI18n } from 'vue-i18n';
import { type MenuItem } from '../menu';
import UiHtmlEditorToolbarTableMenu from '@lib/ui/components/html-editor/extensions/UiHtmlEditorToolbarTableMenu.vue';

interface Props {
  editor: Editor;
  canImgUpload?: boolean;
}

const props = defineProps<Props>();

const { t } = useI18n();

const headingItems = computed((): MenuItem[] => [
  {
    id: 'heading-1',
    title: `${t('ui_lib.html_editor.heading')} 1`,
    prepend: {
      icon: 'mdi-format-header-1',
    },
    active: props.editor.isActive('heading', { level: 1 }),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    id: 'heading-2',
    title: `${t('ui_lib.html_editor.heading')} 2`,
    prepend: {
      icon: 'mdi-format-header-2',
    },
    active: props.editor.isActive('heading', { level: 2 }),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    id: 'heading-3',
    title: `${t('ui_lib.html_editor.heading')} 3`,
    prepend: {
      icon: 'mdi-format-header-3',
    },
    active: props.editor.isActive('heading', { level: 3 }),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    id: 'heading-4',
    title: `${t('ui_lib.html_editor.heading')} 4`,
    prepend: {
      icon: 'mdi-format-header-4',
    },
    active: props.editor.isActive('heading', { level: 4 }),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },
]);
</script>
