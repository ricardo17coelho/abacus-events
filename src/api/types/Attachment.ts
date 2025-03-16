export type AttachmentMimeType =
  | 'application/pdf'
  | 'image/jpeg'
  | 'application/octet-stream'
  | 'image/heic';

export type Attachment = {
  id: string;
  uploaded_at: string;
  display_name: string;
  path: string;
  url: string;
  mime_ype: AttachmentMimeType;
  size: number;
  name: string;
  extension: string;
};
