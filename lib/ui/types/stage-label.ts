import { ValueOf } from '@/utils';

export const VARIANTS_WITHOUT_ICON = {
  CHIP: 'chip',
  BADGE: 'badge',
} as const;

export type FlagVariantsWithoutIcon = ValueOf<typeof VARIANTS_WITHOUT_ICON>;

export const VARIANTS = {
  ...VARIANTS_WITHOUT_ICON,
  ICON: 'icon',
} as const;

export type FlagVariants = ValueOf<typeof VARIANTS>;

export const FLAGS = {
  WIP: {
    color: 'info',
    icon: null,
    text: 'WIP',
  },
  NEW: {
    color: 'yellow',
    icon: '$iconSparkles',
    text: 'NEW',
  },
  DEV: {
    color: 'deep-orange',
    icon: '$iconBug',
    text: 'DEV',
  },
  BETA: {
    color: 'warning',
    icon: null,
    text: 'BETA',
  },
  SOON: {
    color: 'warning',
    icon: null,
    text: 'SOON',
  },
};
// Cannot use "as const" due to https://github.com/microsoft/rushstack/issues/3875

// export type Flags = ValueOf<typeof FLAGS>;
export type Flags = keyof typeof FLAGS;
