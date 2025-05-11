export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
};

export type ProfileSettings = {
  id: string;
  created_at: string;
  openai_api_key_encrypted: string;
};
