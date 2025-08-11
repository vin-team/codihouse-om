export interface Branch {
  id: number;
  status: string;
  state: string;
  sort: number | null;
  user_created: number | null;
  date_created: string | null;
  user_updated: number | null;
  date_updated: string | null;
  title: string;
  location: string | null;
  address: string | null;
  phone: string | null;
  type: string | null;
  manager: {
    id: number;
    first_name: string;
    last_name: string;
  } | null;
  note: string | null;
  today_order_count: number;
  today_revenue: number | null;
  total_customers: number | null;
}

export const parseBranch = (branch: any): Branch => {
  return {
    id: branch.id,
    status: branch.status,
    state: branch.state,
    sort: branch.sort,
    user_created: branch.user_created,
    date_created: branch.date_created,
    user_updated: branch.user_updated,
    date_updated: branch.date_updated,
    title: branch.title,
    location: branch.location,
    address: branch.address,
    phone: branch.phone,
    type: branch.type,
    manager: branch.manager,
    note: branch.note,
    today_order_count: branch.today_order_count,
    today_revenue: branch.today_revenue,
    total_customers: branch.total_customers,
  };
};

export const parseBranches = (branches: any): Branch[] => {
  if (!Array.isArray(branches)) {
    return [];
  }
  return branches.map(parseBranch);
};