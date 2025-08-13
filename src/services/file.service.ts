import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class FileService {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await HttpService.doUploadRequest(`/files`, formData);
    return parseCommonHttpResult(response);
  }
}

export const fileService = new FileService();