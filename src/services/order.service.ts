import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";
import { Pagination } from "@/model/Pagination.mode";

class OrderService {
  async getOrders(pagination?: Pagination) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'customer.first_name',
      'customer.last_name',
      'customer.email',
      'customer.phone',
      'branch.title',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));

    if (pagination) {
      queryParams.append('limit', pagination.limit.toString());
      queryParams.append('offset', ((pagination.page - 1) * pagination.limit).toString());
    }

    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getOrdersCount() {
    const queryParams = new URLSearchParams();
    queryParams.append('aggregate[count]', '*');

    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getOrder(id: string) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'line_items.name',
      'line_items.quantity',
      'customer.first_name',
      'customer.last_name',
      'customer.email',
      'customer.phone',
      'customer.id',
      'branch.title',
      'shipping_address.address',
      'shipping_address.name',
      'shipping_address.phone'
    ];

    fields.forEach(field => queryParams.append('fields[]', field));

    const response = await HttpService.doGetRequest(`/items/om_order/${id}?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  translateColumn = (column: string) => {
    switch (column) {
      case "customer": return "Khách hàng"
      case "customerPhone": return "Số điện thoại"
      case "customerEmail": return "Email"
      case "branch": return "Chi nhánh"
      case "source": return "Nguồn bán"
      case "amount": return "Số tiền"
      case "status": return "Trạng thái"
      case "date": return "Ngày"
      case "time": return "Giờ"
      case "note": return "Ghi chú"
    }
  }
}

export const orderService = new OrderService();