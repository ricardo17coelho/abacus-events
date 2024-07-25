// Icons
import '@mdi/font/css/materialdesignicons.css';

// Vuetify
// Styles
import 'vuetify/styles';

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components';

// Translations provided by Vuetify
import { en, pt } from 'vuetify/locale';

import { VBtn } from 'vuetify/components';

export const themes: Record<string, ThemeDefinition> = {
  light: {
    dark: false,
    colors: {
      primary: '#386867',
      secondary: '#F0E8D9'
    }
  }
};

const opts = {
  directives,
  components: {
    ...components,
    ...labsComponents
  },
  lang: {
    locales: { en, pt },
    current: 'en'
  },
  theme: {
    defaultTheme: 'light',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 4,
      darken: 5
    },
    themes
  },
  treeShake: true,
  aliases: {
    VBtnPrimary: VBtn,
    VBtnSecondary: VBtn,
    VBtnDev: VBtn,
    VBtnDelete: VBtn
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      style: 'text-transform: none;',
      color: undefined
    },
    VBtnPrimary: {
      color: 'primary',
      variant: 'flat'
    },
    VBtnSecondary: {
      variant: 'outlined',
      color: 'primary'
    },
    VBtnDev: {
      variant: 'tonal',
      color: 'warning',
      prependIcon: 'mdi-bug'
    },
    VBtnDelete: {
      variant: 'tonal',
      color: 'error',
      prependIcon: 'mdi-delete'
    },
    VIcon: {
      size: 'small'
    },
    VMenu: {
      VCard: {
        class: 'rounded-xl'
      },
      VList: {
        rounded: 'xl'
      }
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary'
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary'
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary'
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary'
    },
    VDateInput: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      prependIcon: '',
      prependInnerIcon: '$calendar'
    },
    VCheckbox: {
      color: 'primary'
    },
    VCheckboxBtn: {
      color: 'primary'
    },
    VSwitch: {
      color: 'primary'
    }
  }
};
export default createVuetify(opts);
