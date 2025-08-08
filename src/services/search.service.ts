import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class SearchService {
  async search(query: string) {
    const payload = {
      queries: [
        {
          indexUid: 'order',
          q: query
        },
        {
          indexUid: 'customer',
          q: query
        }
      ]
    }
    const response = await HttpService.doPostRequest(`/meili/msearch`, payload);
    return parseCommonHttpResult(response);
  }
}

export const searchService = new SearchService();