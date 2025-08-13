
import { Pagination } from "@/model/Pagination.mode";
import { parseCommonHttpResult } from "./http/parseCommonResult";
import { HttpService } from "./http/HttpService";
import { getOrderCountFilter, getTotalExpenditureFilter, OrderCountFilter, TotalExpenditureFilter } from "@/model/Customer.model";

class CustomerService {
  async getCustomers(pagination?: Pagination) {
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

    if (pagination) {
      queryParams.append('limit', pagination.limit.toString());
      queryParams.append('offset', ((pagination.page - 1) * pagination.limit).toString());
    }

    const response = await HttpService.doGetRequest(`/items/om_customer?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getCustomersCount() {
    const queryParams = new URLSearchParams();
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

  async searchCustomers(filters: any) {
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
    const response = await HttpService.doGetRequest(`/items/om_customer?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }
}

export const customerService = new CustomerService();