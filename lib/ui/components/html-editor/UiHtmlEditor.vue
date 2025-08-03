<template>
  <v-card flat>
    <div class="d-flex align-center flex-wrap ga-3">
      <UiFieldLocaleSelectMenu
        v-if="availableLocales.length"
        v-model="modelCurrentLang"
        :available-locales="availableLocales"
        name="field-locale-select-model"
      />

      <div>
        <UiHtmlEditorToolbarBtn
          v-for="view in views"
          :key="view.id"
          v-tooltip="view.title"
          :icon="view.icon"
          :variant="currentView === view.id ? 'tonal' : undefined"
          @click="currentView = view.id"
        />
      </div>

      <UiHtmlEditorToolbarActions
        v-if="editor && currentView === 'editor'"
        :editor="editor"
      />
      <slot name="append-actions" />
    </div>

    <v-card-text class="px-0">
      <v-tabs-window v-model="currentView">
        <v-tabs-window-item value="editor">
          <div class="editor-container">
            <div
              v-if="editor"
              ref="editorContainer"
              class="editor-content-container"
            >
              <editor-content
                class="editor-content"
                :class="{ 'invalid-editor': !isValid }"
                :editor="editor"
              />
            </div>
            <span
              v-if="editor && characterLimit"
              class="d-flex flex-row justify-end character-count"
              :class="{ hide: !isFocused }"
            >
              {{ editor.storage.characterCount.characters() }} /
              {{ characterLimit }}
            </span>
            <v-scroll-y-transition>
              <div v-show="!isValid" class="required-error">
                {{ t('ui_lib.validation.required') }}
              </div>
            </v-scroll-y-transition>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item
          class="border rounded pa-2 overflow-y-auto"
          :style="{ height: editorHeight + 'px' }"
          value="preview"
        >
          <UiHtmlRender :content="model" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  type PropType,
  ref,
  watch,
} from 'vue';
// tiptap components
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { CharacterCount } from '@tiptap/extensions';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Link from '@tiptap/extension-link';
// components
import UiFieldLocaleSelectMenu from '../fields/UiFieldLocaleSelectMenu.vue';
import UiHtmlEditorToolbarActions from './UiHtmlEditorToolbarActions.vue';
import UiHtmlEditorToolbarBtn from './UiHtmlEditorToolbarBtn.vue';
import UiHtmlRender from '../html/UiHtmlRender.vue';
// composables
import { useI18n } from 'vue-i18n';

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  characterLimit: {
    type: Number,
    default: null,
  },
  availableLocales: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const model = defineModel({ type: String, default: '' });

const modelCurrentLang = defineModel('locale', { type: String, default: null });

type ViewIds = 'editor' | 'preview';

type ViewItem = {
  id: ViewIds;
  icon: string;
  title: string;
};

const currentView = ref<ViewIds>('editor');

const views = computed<ViewItem[]>(() => [
  {
    id: 'editor',
    icon: 'mdi-pencil',
    title: 'ui_lib.html_editor.view.editor.title',
  },
  {
    id: 'preview',
    icon: 'mdi-eye',
    title: 'ui_lib.html_editor.view.preview.title',
  },
]);

const { t } = useI18n();
const isFocused = ref(false);
const isValid = ref(true);

const editorHeight = ref(300); // Default height
const editorContainer = ref<HTMLDivElement | null>(null);
const updateEditorHeight = () => {
  if (editorContainer.value) {
    editorHeight.value = editorContainer.value.clientHeight;
  }
};

const editor = useEditor({
  content: model.value,
  extensions: [
    StarterKit,
    CharacterCount.configure({
      limit: props.characterLimit,
    }),
    Image,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Link.configure({
      autolink: true,
      openOnClick: false,
      linkOnPaste: true,
    }),
  ],
  onUpdate: () => {
    updateEditorHeight();
    const value = editor.value?.getHTML();
    if (value) {
      validate();
      model.value = value;
    }
  },
  onFocus: () => {
    isFocused.value = true;
  },
  onBlur: () => {
    isFocused.value = false;
  },
});

onMounted(() => {
  nextTick(() => {
    updateEditorHeight();
  });
  window.addEventListener('resize', updateEditorHeight);
});

onBeforeUnmount(() => {
  editor.value?.destroy();
  window.removeEventListener('resize', updateEditorHeight);
});

function validate() {
  if (props.required) {
    isValid.value = !editor.value?.isEmpty || true;
    return isValid.value;
  }
  return true;
}

function setContent(content: string) {
  editor.value?.commands.setContent(content);
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue) {
      const editorContent = editor.value?.getHTML();
      if (newValue !== editorContent) {
        setContent(newValue);
      }
    }
  },
  { once: true },
);

defineExpose({ validate, setContent });
</script>
<style lang="scss" scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  max-height: 400px;
}

.editor-content-container {
  position: relative;
  overflow: auto;
  min-height: 250px;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
}

.editor-content-container :deep(.ProseMirror) {
  padding: 12px;
}

.hide {
  display: none !important;
}

.editor-content {
  --gray-1: #f5f5f5;
  --gray-2: #e0e0e0;
  --gray-3: #bdbdbd;
  --purple: #9c27b0;
  --purple-light: #e1bee7;
  --black: #212121;
  --white: #ffffff;

  max-height: 250px;

  :deep(.ProseMirror) {
    min-height: 250px;
    padding: 12px;

    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border-radius: 0.5rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      object-fit: contain;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }

    /* Table-specific styling */
    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 1px solid var(--gray-3);
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: var(--gray-1);
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: var(--gray-2);
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: var(--purple);
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }

    .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}

.character-count {
  color: #666666;
  font-size: 12px;
  margin-top: -24px;
  margin-bottom: 12px;
  padding-right: 18px;
}

.required-error {
  color: #ff5252;
  font-size: 12px;
  margin-bottom: 6px;
}

.invalid-editor :deep(.ProseMirror) {
  border-color: #ff5252;
  margin-bottom: 6px;
}
</style>
