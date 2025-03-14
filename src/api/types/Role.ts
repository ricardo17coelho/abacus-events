import type { TitleI18n } from '@/types/TitleI18n.ts';

export type Role = {
  id: string;
  created_at: string;
  permissions: Permissions[];
  title: TitleI18n;
};
