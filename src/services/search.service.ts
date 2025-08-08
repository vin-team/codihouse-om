import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class SearchService {
  async searchOrders(data: { query: string, page: number, limit: number }) {
    const payload = {
      queries: [
        {
          indexUid: 'order',
          q: data.query,
          limit: data.limit,
          offset: data.page
        },
      ]
    }
    const response = await HttpService.doPostRequest(`/meili/msearch`, payload);
    return parseCommonHttpResult(response);
  }

  async searchCustomers(data: { query: string, page: number, limit: number }) {
    const payload = {
      queries: [
        {
          indexUid: 'customer',
          q: data.query,
          limit: data.limit,
          offset: data.page
        }
      ]
    }
    const response = await HttpService.doPostRequest(`/meili/msearch`, payload);
    return parseCommonHttpResult(response);
  }
}

export const searchService = new SearchService();