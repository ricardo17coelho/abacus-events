export const EVENT_LAYOUT = {
  EVENT_LAYOUT_01: 'EVENT_LAYOUT_01',
  EVENT_LAYOUT_02: 'EVENT_LAYOUT_02',
  EVENT_LAYOUT_03: 'EVENT_LAYOUT_03',
} as const;

export type EventLayout = (typeof EVENT_LAYOUT)[keyof typeof EVENT_LAYOUT];
