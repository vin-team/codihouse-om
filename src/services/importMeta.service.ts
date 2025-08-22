import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class ImportMetaService {
  async getImportMeta(id: string) {
    const queryParams = new URLSearchParams();
    queryParams.append('fields[]', '*');
    queryParams.append('fields[]', 'excel_file.id');
    queryParams.append('fields[]', 'excel_file.title');

    queryParams.append('filter[_and][0][excel_file][id][_eq]', id);

    const response = await HttpService.doGetRequest(`/items/import_meta?${queryParams.toString()}`, "");
    return parseCommonHttpResult(response);
  }

  async getImportLogs(importLogs: number[]) {
    const queryParams = new URLSearchParams();
    queryParams.append('fields[]', 'id');
    queryParams.append('fields[]', 'import_id');
    queryParams.append('fields[]', 'state');
    queryParams.append('fields[]', 'note');
    queryParams.append('fields[]', 'date_created');
    queryParams.append('fields[]', 'date_updated');
    queryParams.append('fields[]', 'payload');
    queryParams.append('fields[]', 'status');
    queryParams.append('fields[]', 'excel_file.id');
    queryParams.append('fields[]', 'excel_file.title');
    queryParams.append('filter[_and][0][id][_in]', importLogs.join(','));

    const response = await HttpService.doGetRequest(`/items/import_meta?${queryParams.toString()}`, "");
    return parseCommonHttpResult(response);
  }

  async getTwoImportLogs(importLogs: number[]) {
    const queryParams = new URLSearchParams();
    queryParams.append('fields[]', '*');
    queryParams.append('fields[]', 'excel_file.id');
    queryParams.append('fields[]', 'excel_file.title');
    queryParams.append('filter[_and][0][id][_in]', importLogs.join(','));

    const response = await HttpService.doGetRequest(`/items/import_meta?${queryParams.toString()}`, "");
    return parseCommonHttpResult(response);
  }
}

export const importMetaService = new ImportMetaService();