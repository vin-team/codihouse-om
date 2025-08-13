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
}

export const importMetaService = new ImportMetaService();