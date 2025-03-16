import type { EventLayout } from '@/api/types/EventLayout.ts';
import type { Attachment } from '@/api/types/Attachment.ts';

export interface EventBrandBanner extends Attachment {
  order: 0;
}

export type EventBrand = {
  event_id: string;
  created_at: string;
  color_primary: string;
  color_secondary: string;
  banners: EventBrandBanner[];
  logo: string;
  layout: EventLayout;
};
