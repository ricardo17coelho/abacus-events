<template>
  <UiHtmlEditorToolbarMenu icon="mdi-table" :items="tableItems" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MenuItem } from '../../menu';
import type { Editor } from '@tiptap/vue-3';

import UiHtmlEditorToolbarMenu from '../UiHtmlEditorToolbarMenu.vue';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();
const { t } = useI18n();

const tableItems = computed((): MenuItem[] => [
  {
    id: 'insert-table',
    title: t('ui_lib.html_editor.insert_table'),
    prepend: { icon: 'mdi-table-plus' },
    action: () =>
      props.editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    id: 'add-row-before',
    title: t('ui_lib.html_editor.add_row_before'),
    prepend: { icon: 'mdi-table-row-plus-before' },
    action: () => props.editor.chain().focus().addRowBefore().run(),
  },
  {
    id: 'add-row-after',
    title: t('ui_lib.html_editor.add_row_after'),
    prepend: { icon: 'mdi-table-row-plus-after' },
    action: () => props.editor.chain().focus().addRowAfter().run(),
  },
  {
    id: 'delete-row',
    title: t('ui_lib.html_editor.delete_row'),
    prepend: { icon: 'mdi-table-row-remove' },
    action: () => props.editor.chain().focus().deleteRow().run(),
  },
  {
    id: 'add-column-before',
    title: t('ui_lib.html_editor.add_column_before'),
    prepend: { icon: 'mdi-table-column-plus-before' },
    action: () => props.editor.chain().focus().addColumnBefore().run(),
  },
  {
    id: 'add-column-after',
    title: t('ui_lib.html_editor.add_column_after'),
    prepend: { icon: 'mdi-table-column-plus-after' },
    action: () => props.editor.chain().focus().addColumnAfter().run(),
  },
  {
    id: 'delete-column',
    title: t('ui_lib.html_editor.delete_column'),
    prepend: { icon: 'mdi-table-column-remove' },
    action: () => props.editor.chain().focus().deleteColumn().run(),
  },
  {
    id: 'delete-table',
    title: t('ui_lib.html_editor.delete_table'),
    prepend: { icon: 'mdi-table-remove' },
    action: () => props.editor.chain().focus().deleteTable().run(),
  },
]);
</script>
