import type { Attachment } from '@/api/types/Attachment.ts';

export interface EventFile extends Attachment {
  order: number;
}
