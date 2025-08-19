
import { Pagination } from "@/model/Pagination.mode";
import { parseCommonHttpResult } from "./http/parseCommonResult";
import { HttpService } from "./http/HttpService";
import { getOrderCountFilter, getTotalExpenditureFilter, OrderCountFilter, TotalExpenditureFilter } from "@/model/Customer.model";

class CustomerService {
  async getCustomers(data: { filters: any, pagination?: Pagination }) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'orders.code',
      'staff.id',
      'staff.first_name',
      'staff.last_name',
      'staff.branch.title',
      'address_book.address',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));

    let filter: any = {};
    let andConditions: any[] = [];

    if (data.filters.search) {
      filter._or = [
        {
          code: { _icontains: data.filters.search }
        },
        {
          first_name: { _icontains: data.filters.search }
        },
        {
          last_name: { _icontains: data.filters.search }
        },
        {
          email: { _icontains: data.filters.search }
        },
        {
          phone: { _icontains: data.filters.search }
        }
      ];
    }

    if (data.filters.state && data.filters.state !== 'all') {
      andConditions.push({
        state: { _eq: data.filters.state }
      });
    }

    if (data.filters.orderCount && data.filters.orderCount !== OrderCountFilter.ALL) {
      andConditions.push(getOrderCountFilter(data.filters.orderCount));
    }

    if (data.filters.totalExpenditure && data.filters.totalExpenditure !== TotalExpenditureFilter.ALL) {
      andConditions.push(getTotalExpenditureFilter(data.filters.totalExpenditure));
    }

    if (andConditions.length > 0) {
      filter._and = andConditions;
    }

    queryParams.append('filter', JSON.stringify(filter));
    if (data.pagination) {
      queryParams.append('limit', data.pagination.limit.toString());
      queryParams.append('offset', ((data.pagination.page - 1) * data.pagination.limit).toString());
    }

    const response = await HttpService.doGetRequest(`/items/om_customer?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getCustomersCount(filters: any) {
    const queryParams = new URLSearchParams();
    let filter: any = {};
    let andConditions: any[] = [];

    if (filters.search) {
      filter._or = [
        {
          code: { _icontains: filters.search }
        },
        {
          first_name: { _icontains: filters.search }
        },
        {
          last_name: { _icontains: filters.search }
        },
        {
          email: { _icontains: filters.search }
        },
        {
          phone: { _icontains: filters.search }
        }
      ];
    }

    if (filters.state && filters.state !== 'all') {
      andConditions.push({
        state: { _eq: filters.state }
      });
    }

    if (filters.orderCount && filters.orderCount !== OrderCountFilter.ALL) {
      andConditions.push(getOrderCountFilter(filters.orderCount));
    }

    if (filters.totalExpenditure && filters.totalExpenditure !== TotalExpenditureFilter.ALL) {
      andConditions.push(getTotalExpenditureFilter(filters.totalExpenditure));
    }

    if (andConditions.length > 0) {
      filter._and = andConditions;
    }

    queryParams.append('filter', JSON.stringify(filter));
    queryParams.append('aggregate[count]', '*');

    const response = await HttpService.doGetRequest(`/items/om_customer?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getCustomer(id: string) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'address_book.address',
      'group.code',
      'orders.id',
      'orders.code',
      'orders.total_price',
      'orders.date_created',
      'orders.state',
      'orders.branch.title',
      'orders.line_items.name',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));

    const response = await HttpService.doGetRequest(`/items/om_customer/${id}?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }
}

export const customerService = new CustomerService();