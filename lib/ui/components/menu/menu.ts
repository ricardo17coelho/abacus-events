import { computed } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import type { ExtractProps } from '@/types/utils';
import { VIcon } from 'vuetify/components';
import { useI18n } from 'vue-i18n';
import type { Flags } from '@/types';

export const MENU_DEFAULT_KEYS = {
  LANGUAGE: 'language',
};

export type MenuUserDefaultKeys =
  (typeof MENU_DEFAULT_KEYS)[keyof typeof MENU_DEFAULT_KEYS];

export interface MenuItemPrependAppend {
  flag?: Flags;
  icon?: ExtractProps<typeof VIcon> | string;
  text?: string;
}

export interface MenuItem {
  key?: MenuUserDefaultKeys | string;
  id?: string;
  divider?: boolean;
  spacer?: boolean;
  space?: string;
  title?: string;
  to?: RouteLocationNamedRaw;
  disabled?: boolean;
  href?: string;
  target?: string;
  class?: string;
  color?: string;
  prepend?: MenuItemPrependAppend;
  append?: MenuItemPrependAppend;
  dataTestId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  items?: MenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (item?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  show?: (item?: any) => boolean;
}

export type MenuActions = 'view' | 'edit' | 'delete';

export function useMenuActions() {
  const { t } = useI18n();

  const menuGlobalActions = computed<Record<MenuActions, MenuItem>>(() => {
    return {
      ['view']: {
        key: 'view',
        title: t('actions.view'),
        prepend: {
          icon: {
            icon: 'mdi-eye',
          },
        },
      },
      ['edit']: {
        key: 'edit',
        title: t('actions.edit'),
        prepend: {
          icon: {
            icon: 'mdi-pencil',
          },
        },
      },
      ['delete']: {
        key: 'delete',
        title: t('actions.delete'),
        prepend: {
          icon: {
            icon: 'mdi-delete',
            color: 'error',
          },
        },
      },
    };
  });

  return {
    menuGlobalActions,
  };
}
