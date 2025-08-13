export interface ImportMeta {
  id: number;
  state: string;
  note: string;
  meta: any;
  excel_file: {
    id: number;
    title: string;
  };
}

export const parseImportMeta = (data: any): ImportMeta => {
  return {
    id: data.id,
    state: data.state,
    note: data.note,
    meta: data.meta,
    excel_file: data.excel_file,
  };
};

export const parseImportMetaList = (data: any): ImportMeta[] => {
  if (Array.isArray(data)) {
    return data.map((item: any) => parseImportMeta(item));
  }
  return [];
};