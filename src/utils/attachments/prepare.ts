import { decode } from 'base64-arraybuffer';
import convert from 'heic-convert';
import sharp from 'sharp';
import type { AttachmentMimeType } from '@/api/types/Attachment.ts';

export function stripSpecialCharacters(inputString: string) {
  // Remove special characters and spaces, keep alphanumeric, hyphens/underscores, and dots
  return inputString
    .replace(/[^a-zA-Z0-9-_\s.]/g, '') // Remove special chars except hyphen/underscore/dot
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase for consistency
}

export type AttachmentPrepared = {
  content: Buffer | ArrayBuffer;
  mime_ype: AttachmentMimeType;
  size: number;
  name: string;
  display_name: string;
};

const MAX_SIZE = 1500;

export async function prepareDocument(
  file: Blob,
  fileName: string,
): Promise<AttachmentPrepared> {
  const fBuffer = await file.arrayBuffer();
  const buffer = decode(fBuffer);
  const sanitizedName = stripSpecialCharacters(fileName);

  switch (file.type) {
    case 'application/octet-stream':
    case 'application/pdf': {
      return {
        content: buffer,
        mime_ype: 'application/pdf',
        size: file.size,
        display_name: fileName,
        name: `${sanitizedName}.pdf`,
      };
    }
    case 'image/heic': {
      const decodedImage = await convert({
        buffer: new Uint8Array(buffer),
        format: 'JPEG',
        quality: 1,
      });

      const image = await sharp(decodedImage)
        .rotate()
        .resize({ width: MAX_SIZE })
        .toFormat('jpeg')
        .toBuffer();

      return {
        content: image,
        mime_ype: 'image/jpeg',
        size: image.byteLength,
        display_name: fileName,
        name: `${sanitizedName}.jpg`,
      };
    }
    default: {
      const image = await sharp(buffer)
        .rotate()
        .resize({ width: MAX_SIZE })
        .toFormat('jpeg')
        .toBuffer();

      return {
        content: image,
        mime_ype: 'image/jpeg',
        size: image.byteLength,
        display_name: fileName,
        name: `${sanitizedName}.jpg`,
      };
    }
  }
}
