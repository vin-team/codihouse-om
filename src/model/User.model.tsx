export interface UserModel {
  id: string;
  code: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  title: string | null;
  description: string | null;
  tags: string | null;
  avatar: string;
  language: string | null;
  tfa_secret: string | null;
  status: string;
  role: {
    id: string;
    name: string;
    app_role: string;
  };
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
  branch: {
    id: string | null;
    title: string | null;
  };
}

export const parseUser = (data: any): UserModel => {
  return {
    id: data.id,
    code: data.code,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
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
    branch: {
      id: data.branch?.id,
      title: data.branch?.title,
    }
  }
}

export const parseUsers = (data: any): UserModel[] => {
  if (Array.isArray(data)) {
    return data.map((item: any) => parseUser(item));
  }
  return [];
} 