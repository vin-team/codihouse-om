export interface ImportLog {
  id: number;
  import_id: string;
  state: string;
  note: string;
  excel_file: {
    id: number;
    title: string;
  };
  date_created: string;
  date_updated: string;
  payload: any;
  status: string;
  meta: any[];
}

export function parseImportLog(json: any): ImportLog {
  return {
    id: json.id,
    import_id: json.import_id,
    state: json.state,
    note: json.note,
    excel_file: {
      id: json.excel_file?.id,
      title: json.excel_file?.title,
    },
    date_created: json.date_created,
    date_updated: json.date_updated,
    payload: json.payload,
    status: json.status,
    meta: json.meta,
  };
}

export function parseImportLogList(jsonArray: any[]): ImportLog[] {
  return jsonArray.map((item) => parseImportLog(item));
}
