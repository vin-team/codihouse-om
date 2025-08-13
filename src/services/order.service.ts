import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";
import { Pagination } from "@/model/Pagination.mode";
import { formatDate } from "date-fns";

class OrderService {
  async getOrders(pagination?: Pagination) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'customer.first_name',
      'customer.last_name',
      'customer.email',
      'customer.phone',
      'branch.id',
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
      'line_items.price',
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

  async getRecentOrders() {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'customer.first_name',
      'customer.last_name',
      'customer.email',
      'customer.phone',
      'branch.id',
      'branch.title',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));

    queryParams.append('limit', '5');
    queryParams.append('sort', '-date_created');
    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async searchOrders(filters: any) {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'customer.first_name',
      'customer.last_name',
      'customer.email',
      'customer.phone',
      'branch.id',
      'branch.title',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));

    let filter: any = {};
    let andConditions: any[] = [];

    if (filters.keyword) {
      filter._or = [
        {
          name: { _icontains: filters.keyword }
        },
        {
          code: { _icontains: filters.keyword }
        },
        {
          customer: {
            first_name: { _icontains: filters.keyword }
          },
        },
        {
          customer: {
            last_name: { _icontains: filters.keyword }
          },
        },
        {
          customer: {
            email: { _icontains: filters.keyword }
          },
        },
        {
          customer: {
            phone: { _icontains: filters.keyword }
          },
        },
        {
          branch: {
            title: { _icontains: filters.keyword }
          },
        }
      ];
    }
    if (filters.state && filters.state !== 'all') {
      andConditions.push({
        state: { _eq: filters.state }
      });
    }

    if (filters.branch_id && filters.branch_id !== 'all') {
      andConditions.push({
        branch: { id: { _eq: filters.branch_id } }
      });
    }

    if (filters.date_range?.from || filters.date_range?.to) {
      let dateCondition: any = {};
      if (filters.date_range?.from) {
        dateCondition._gte = filters.date_range.from;
      }
      if (filters.date_range?.to) {
        dateCondition._lte = filters.date_range.to;
      }
      andConditions.push({
        date_created: dateCondition
      });
    }

    if (andConditions.length > 0) {
      filter._and = andConditions;
    }

    queryParams.append('filter', JSON.stringify(filter));

    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getStatisticsByBranchAndDate(payload: any) {
    const queryParams = new URLSearchParams();
    queryParams.append('filter', JSON.stringify({
      _and: [
        { state: { _eq: 'Hoàn thành' } },
        { branch: { id: { _eq: payload.branch_id } } },
        { 'year(complete_date)': { _eq: payload.year } },
        { 'month(complete_date)': { _eq: payload.month } },
        { 'day(complete_date)': { _eq: payload.day } },
      ]
    }));
    queryParams.append('aggregate[countDistinct][0]', 'id');
    queryParams.append('aggregate[countDistinct][1]', 'customer');
    queryParams.append('aggregate[sum][0]', 'total_price');

    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getStatisticsByBranchedAndDate(payload: any) {
    const queryParams = new URLSearchParams();
    queryParams.append('filter', JSON.stringify({
      _and: [
        { branch: { id: { _in: payload.branch_ids } } },
        { 'year(complete_date)': { _eq: payload.year } },
        { 'month(complete_date)': { _eq: payload.month } },
      ]
    }));
    queryParams.append('aggregate[countDistinct][0]', 'id');
    queryParams.append('aggregate[countDistinct][1]', 'customer');
    queryParams.append('aggregate[sum][0]', 'total_price');
    queryParams.append('groupBy[]', 'branch');

    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }


  async getOrderCountByBranches(payload: any) {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[_and][0][state][_eq]', 'Hoàn thành');
    payload.branch_ids.forEach((branch_id: number) => {
      queryParams.append('filter[_and][1][branch][id][_in][]', branch_id.toString());
    });
    queryParams.append('filter[_and][2][year(complete_date)][_eq]', payload.year.toString());
    queryParams.append('filter[_and][3][month(complete_date)][_eq]', payload.month.toString());
    queryParams.append('filter[_and][4][day(complete_date)][_eq]', payload.day.toString());
    queryParams.append('aggregate[countDistinct][0]', 'id');
    queryParams.append('groupBy[]', 'branch');

    const response = await HttpService.doGetRequest(`/items/om_order?${queryParams}`, "");
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