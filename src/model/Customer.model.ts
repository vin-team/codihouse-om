export interface Customer {
  id: number;
  status: string;
  sort: number | null;
  user_created: number | null;
  date_created: string | null;
  user_updated: number | null;
  date_updated: string | null;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string;
  verified_email: string | null;
  note: string | null;
  code: string;
  group: string | null;
  points: number | null;
  sex: string | null;
  total_expenditure: number;
  total_order: number;
  total_products_purchased: number;
  total_returned_products: number;
  last_purchase_date: string | null;
  address: string | null;
  staff: number | null;
  total_debt: number;
  address_book: {
    address: string;
  }[];
  orders: {
    id: number;
    code: string;
    total_price: number;
    status: string;
    branch: {
      title: string;
    };
    line_items: {
      name: string;
    }[];
  }[];
}

export const parseCustomer = (customer: any): Customer => {
  return {
    id: customer.id,
    status: customer.status,
    sort: customer.sort,
    user_created: customer.user_created,
    date_created: customer.date_created,
    user_updated: customer.user_updated,
    date_updated: customer.date_updated,
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    phone: customer.phone,
    verified_email: customer.verified_email,
    note: customer.note,
    code: customer.code,
    group: customer.group,
    points: customer.points,
    sex: customer.sex,
    total_expenditure: customer.total_expenditure,
    total_order: customer.total_order,
    total_products_purchased: customer.total_products_purchased,
    total_returned_products: customer.total_returned_products,
    last_purchase_date: customer.last_purchase_date,
    address: customer.address,
    staff: customer.staff,
    total_debt: customer.total_debt,
    address_book: customer.address_book,
    orders: customer.orders,
  };
};

export const parseCustomers = (customers: any[]): Customer[] => {
  if (!Array.isArray(customers)) return [];
  return customers.map(parseCustomer);
};