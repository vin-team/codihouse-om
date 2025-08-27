import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Combobox } from "../ui/combobox";
import { Label } from "../ui/label";
import { useEffect } from "react";
import { getImportsData, setFilter } from "@/slices/importDataSlice";
import { translateCollection } from "@/model/ImportData.model";
import { setTotalPages, setTotalRecords } from "@/slices/importMetaSlice";

export default function LogsFilter() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.importData.filter);
  const pagination = useAppSelector(state => state.importMeta.pagination);
  const importDataList = useAppSelector(state => state.importData.importDataList);
  const importDataState = useAppSelector(state => state.importData.requestState);

  useEffect(() => {
    dispatch(getImportsData());
  }, []);

  const handleChangeType = (value: string) => {
    const importData = importDataList.find(item => item.collection === value);
    dispatch(setTotalPages(Math.ceil((importData?.import_logs?.length ?? 0) / pagination.limit)));
    dispatch(setTotalRecords(importData?.import_logs?.length ?? 0));
    dispatch(setFilter({ ...filter, type: value, importLogs: importData?.import_logs ?? [] }));
  }

  useEffect(() => {
    if (importDataState.type === 'getImportsData') {
      if (importDataState.status === 'completed') {
        if (importDataList.length > 0) {
          handleChangeType(importDataList[0].collection);
        }
      }
    }
  }, [importDataState]);

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
      <div className="flex flex-row space-x-4 items-center">
        <Label htmlFor="type">Loại dữ liệu</Label>
        <Combobox
          className='w-full flex-1'
          options={importDataList.map((item) => ({ value: item.collection, label: translateCollection(item.collection) }))}
          value={filter.type}
          onChange={handleChangeType}
          placeholder='Chọn loại dữ liệu'
        />
      </div>
    </div>
  );
}