
import { Pagination } from "@/model/Pagination.mode";
import { parseCommonHttpResult } from "./http/parseCommonResult";
import { HttpService } from "./http/HttpService";

class CustomerService {
  async getCustomers(pagination?: Pagination) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'orders.code',
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
      'orders.id',
      'orders.code',
      'orders.total_price',
      'orders.status',
      'orders.branch.title',
      'orders.line_items.name',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));

    const response = await HttpService.doGetRequest(`/items/om_customer/${id}?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }
}

export const customerService = new CustomerService();