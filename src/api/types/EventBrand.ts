import type { EventLayout } from '@/api/types/EventLayout.ts';
import type { Attachment } from '@/api/types/Attachment.ts';

export interface EventBrandBanner extends Attachment {
  order: number;
}

export type EventBrand = {
  event_id: string;
  created_at: string;
  color_primary: string;
  color_secondary: string;
  color_tertiary: string;
  banners: EventBrandBanner[];
  logo: string;
  layout: EventLayout;
};
