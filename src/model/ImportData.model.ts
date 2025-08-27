export interface ImportData {
  id: number;
  status: string;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  excel_file: string;
  template_file: string;
  state: string;
  collection: string;
  import_logs: { id: number, state: string }[];
}

export const translateCollection = (collection: string) => {
  switch (collection) {
    case 'customer':
      return 'Khách hàng';
    case 'order':
      return 'Đơn hàng';
    default:
      return collection;
  }
}

export const parseImportData = (importData: any): ImportData => {
  return {
    id: importData.id,
    status: importData.status,
    user_created: importData.user_created,
    date_created: importData.date_created,
    user_updated: importData.user_updated,
    date_updated: importData.date_updated,
    title: importData.title,
    excel_file: importData.excel_file,
    template_file: importData.template_file,
    state: importData.state,
    collection: importData.collection,
    import_logs: importData?.import_logs?.map((log: any) => ({
      id: log.id,
      state: log.state,
      date_created: log.date_created,
    })) ?? [],
  };
};

export const parseImportsData = (importsData: any[]): ImportData[] => {
  if (!Array.isArray(importsData)) return [];
  return importsData.map(parseImportData);
};