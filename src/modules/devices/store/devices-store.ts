import { reactive } from "vue";
import { defineStore } from "pinia";
import { IDevicesState, IFilterOption } from "../types";
import { IDevice } from "../types";

export const useDevicesStore = defineStore(
  "devices",
  () => {
    const state = reactive<IDevicesState>({
      currentTablePage: 1,
      filterOptionsData: [],
      tableData: [],
      tableItemsSize: null,
    });

    const setDevicesTableData = (devices: IDevice[]) => {
      state.tableData = devices;
    };

    const setFilterOptionsData = (filterOptionsData: IFilterOption[]) => {
      state.filterOptionsData = filterOptionsData;
    };

    const setCurrentTablePage = (page: number) => {
      state.currentTablePage = page;
    };

    const setTableItemsSize = (tableItemsSize: number) => {
      state.tableItemsSize = tableItemsSize;
    };
    return {
      state,
      setDevicesTableData,
      setFilterOptionsData,
      setCurrentTablePage,
      setTableItemsSize,
    };
  },
  {
    persist: false,
  }
);
