import type { Attachment } from '@/api/types/Attachment.ts';

export interface EventAttachment extends Attachment {
  event_id: string;
}
