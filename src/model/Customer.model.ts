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
  group: {
    code: string | null;
  };
  points: number | null;
  sex: string | null;
  total_expenditure: number;
  total_order: number;
  total_products_purchased: number;
  total_returned_products: number;
  last_purchase_date: string | null;
  address: string | null;
  state: string | null;
  staff: {
    id: number | null;
    first_name: string | null;
    last_name: string | null;
    branch: {
      title: string | null;
    };
  };
  total_debt: number;
  address_book: {
    address: string;
  }[];
  orders: {
    id: number;
    code: string;
    total_price: number;
    date_created: string;
    state: string;
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
    state: customer.state,
  };
};

export const parseCustomers = (customers: any[]): Customer[] => {
  if (!Array.isArray(customers)) return [];
  return customers.map(parseCustomer);
};

export enum OrderCountFilter {
  ALL = 'all',
  RANGE_1_5 = '1_5',
  RANGE_6_15 = '6_15',
  RANGE_16_30 = '16_30',
  OVER_30 = '30',
}

export enum TotalExpenditureFilter {
  ALL = 'all',
  UNDER_1M = '1M',
  RANGE_1_3M = '1_3M',
  RANGE_3_5M = '3_5M',
  OVER_5M = '5M',
}

export const getOrderCountFilter = (orderCount: string) => {
  if (orderCount && orderCount !== OrderCountFilter.ALL) {
    switch (orderCount) {
      case OrderCountFilter.RANGE_1_5:
        return { total_order: { _gte: 1, _lte: 5 } };
      case OrderCountFilter.RANGE_6_15:
        return { total_order: { _gte: 6, _lte: 15 } };
      case OrderCountFilter.RANGE_16_30:
        return { total_order: { _gte: 16, _lte: 30 } };
      case OrderCountFilter.OVER_30:
        return { total_order: { _gt: 30 } };
    }
  }
  return {};
}

export const getTotalExpenditureFilter = (totalExpenditure: string) => {
  if (totalExpenditure && totalExpenditure !== TotalExpenditureFilter.ALL) {
    switch (totalExpenditure) {
      case TotalExpenditureFilter.UNDER_1M:
        return { total_expenditure: { _lt: 1_000_000 } };
      case TotalExpenditureFilter.RANGE_1_3M:
        return { total_expenditure: { _gte: 1_000_000, _lte: 3_000_000 } };
      case TotalExpenditureFilter.RANGE_3_5M:
        return { total_expenditure: { _gte: 3_000_000, _lte: 5_000_000 } };
      case TotalExpenditureFilter.OVER_5M:
        return { total_expenditure: { _gt: 5_000_000 } };
    }
  }

  return {};
}