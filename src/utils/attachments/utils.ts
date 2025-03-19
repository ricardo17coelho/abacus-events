export function isPdf(file: Attachment) {
  return file.mime_type === 'application/pdf';
}
