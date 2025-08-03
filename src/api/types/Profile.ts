export const USER_ROLE = {
  ADMIN: 'ADMIN',
  HELPER: 'HELPER',
} as const;

export type UserRoles = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
};

export type ProfileWithRoles = Profile & {
  userroles: UserRoles[];
};
export type ProfileSettings = {
  id: string;
  created_at: string;
  openai_api_key_encrypted: string;
};
