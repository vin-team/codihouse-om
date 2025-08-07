import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class BranchService {
  async getBranches() {
    const queryParams = new URLSearchParams();
    const fields = ['*'];
    fields.forEach(field => queryParams.append('fields[]', field));
    const response = await HttpService.doGetRequest(`/items/om_branch?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getBranchesCount() {
    const queryParams = new URLSearchParams();
    queryParams.append('aggregate[count]', '*');
    const response = await HttpService.doGetRequest(`/items/om_branch?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async getBranch(id: string) {
    const queryParams = new URLSearchParams();
    queryParams.append('fields[]', '*');
    const response = await HttpService.doGetRequest(`/items/om_branch/${id}?${queryParams}`, "");
    return parseCommonHttpResult(response);
  }

  async createBranch(data: any) {
    const response = await HttpService.doPostRequest(`/items/om_branch`, data);
    return parseCommonHttpResult(response);
  }

  async updateBranch(data: any) {
    const response = await HttpService.doPatchRequest(`/items/om_branch/${data?.id}`, data);
    return parseCommonHttpResult(response);
  }
}

export default new BranchService();