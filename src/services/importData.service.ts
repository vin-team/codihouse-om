import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class ImportDataService {
  async getImportsData() {
    const queryParams = new URLSearchParams();
    queryParams.append('fields[]', '*');
    queryParams.append('fields[]', 'import_logs.id');
    queryParams.append('fields[]', 'import_logs.state');
    const response = await HttpService.doGetRequest(`/items/import_data?${queryParams.toString()}`, "");
    return parseCommonHttpResult(response);
  }

  async updateImportData(payload: { id: number, data: any }) {
    const response = await HttpService.doPatchRequest(`/items/import_data/${payload.id}`, payload.data);
    return parseCommonHttpResult(response);
  }
}

export const importDataService = new ImportDataService();