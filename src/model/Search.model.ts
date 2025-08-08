export interface SearchResult {
  orders: SearchOrder[];
  customers: SearchCustomer[];
}

export interface SearchOrder {
  id: number;
  code: string;
  date_created: string;
  status: string;
  source: string;
  total_price: number;
  customer_name: string;
  customer_code: string | null;
  customer_phone: string | null;
  products: string | null;
}

export const parseSearchOrder = (order: any): SearchOrder => {
  return {
    id: order.id,
    code: order.code,
    date_created: order.date_created,
    status: order.status,
    source: order.source,
    total_price: order.total_price,
    customer_name: order.customer_name,
    customer_code: order.customer_code,
    customer_phone: order.customer_phone,
    products: order.products,
  };
};

export const parseSearchOrders = (orders: any): SearchOrder[] => {
  if (!Array.isArray(orders)) return [];
  return orders.map(parseSearchOrder);
};

export interface SearchCustomer {
  id: number;
  code: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string;
  last_purchase_date: string | null;
  total_expenditure: number;
  group_code: string | null;
  group_title: string | null;
}

export const parseSearchCustomer = (customer: any): SearchCustomer => {
  return {
    id: customer.id,
    code: customer.code,
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    phone: customer.phone,
    last_purchase_date: customer.last_purchase_date,
    total_expenditure: customer.total_expenditure,
    group_code: customer.group_code,
    group_title: customer.group_title,
  };
};

export const parseSearchCustomers = (customers: any): SearchCustomer[] => {
  if (!Array.isArray(customers)) return [];
  return customers.map(parseSearchCustomer);
};