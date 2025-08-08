export interface Order {
  id: number;
  status: string;
  sort: number | null;
  user_created: number | null;
  date_created: string | null;
  user_updated: number | null;
  date_updated: string | null;
  billing_address: string | null;
  shipping_address: {
    address: string | null;
    name: string | null;
    phone: string | null;
  } | null;
  total_price: number;
  subtotal_price: number | null;
  total_tax: number | null;
  total_discount: number | null;
  currency: string | null;
  payment_status: string | null,
  name: string | null,
  code: string;
  document_date: string | null;
  approval_date: string | null;
  source: string;
  note: string;
  email: string | null;
  shipping_fee: number | null;
  line_items: {
    name: string | null;
    quantity: number | 0;
  }[];
  customer: {
    id: number;
    phone: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  },
  branch: {
    id: number;
    title: string | null;
  }
}

export const parseOrder = (order: any): Order => {
  return {
    id: order.id,
    status: order.status,
    sort: order.sort,
    user_created: order.user_created,
    date_created: order.date_created,
    user_updated: order.user_updated,
    date_updated: order.date_updated,
    customer: order.customer,
    billing_address: order.billing_address,
    shipping_address: order.shipping_address,
    total_price: order.total_price,
    subtotal_price: order.subtotal_price,
    total_tax: order.total_tax,
    total_discount: order.total_discount,
    currency: order.currency,
    payment_status: order.payment_status,
    name: order.name,
    code: order.code,
    document_date: order.document_date,
    approval_date: order.approval_date,
    source: order.source,
    note: order.note,
    branch: order.branch,
    email: order.email,
    line_items: order.line_items,
    shipping_fee: order.shipping_fee,
  };
};

export const parseOrders = (orders: any): Order[] => {
  if (!Array.isArray(orders)) {
    return [];
  }

  return orders.map(parseOrder);
};  