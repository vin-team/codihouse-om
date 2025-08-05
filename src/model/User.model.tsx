export interface UserModel {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  location: string | null;
  title: string | null;
  description: string | null;
  tags: string | null;
  avatar: string;
  language: string | null;
  tfa_secret: string | null;
  status: string;
  role: string;
  last_access: string;
  last_page: string;
  provider: string;
  external_identifier: string | null;
  auth_data: string | null;
  email_notifications: boolean;
  appearance: string | null;
  theme_dark: string | null;
  theme_light: string | null;
  theme_light_overrides: string | null;
  theme_dark_overrides: string | null;
  text_direction: string;
}

export const parseUser = (data: any): UserModel => {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    location: data.location,
    title: data.title,
    description: data.description,
    tags: data.tags,
    avatar: data.avatar,
    language: data.language,
    tfa_secret: data.tfa_secret,
    status: data.status,
    role: data.role,
    last_access: data.last_access,
    last_page: data.last_page,
    provider: data.provider,
    external_identifier: data.external_identifier,
    auth_data: data.auth_data,
    email_notifications: data.email_notifications,
    appearance: data.appearance,
    theme_dark: data.theme_dark,
    theme_light: data.theme_light,
    theme_light_overrides: data.theme_light_overrides,
    theme_dark_overrides: data.theme_dark_overrides,
    text_direction: data.text_direction,
  }
} 