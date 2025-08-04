export interface RoleModel {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  parent: string | null;
  children: string[];
  users: string[];
}

export const parseRole = (data: any): RoleModel => {
  return {
    id: data.id,
    name: data.name,
    icon: data.icon,
    description: data.description,
    parent: data.parent,
    children: data.children,
    users: data.users,
  }
}