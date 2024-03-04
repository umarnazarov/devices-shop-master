import { useDevicesStore } from "@/modules/devices/store/devices-store";
import { baseFetch } from "@/common/helpers/apiBase";
import { IPaginationData } from "@/common/types";
import { IDevice, IFilterOption } from "../types";

export function useDevices() {
  const store = useDevicesStore();

  async function getDevicesByPage(page: number = 1) {
    try {
      const { data, items, prev, next, last } = await baseFetch<
        IPaginationData<IDevice[]>
      >(
        `/devices?_page=${page}?per_page=${
          import.meta.env.VITE_BASE_ITEMS_PER_PAGE
        }`
      );
      const currentPage = prev === null ? 1 : next === null ? last : next - 1;

      store.setDevicesTableData(data);
      store.setCurrentTablePage(currentPage);
      store.setTableItemsSize(items);
      return data;
    } catch (error) {
      console.error("getDevices error:", error);
      throw error;
    }
  }

  async function getDevicesFilterOptions() {
    try {
      const { data } = await baseFetch<IPaginationData<IFilterOption[]>>(
        `/devicesFilterOptions?_page=1`
      );

      store.setFilterOptionsData(data);
      return data;
    } catch (error) {
      console.error("getDevicesFilterOptions error:", error);
      throw error;
    }
  }

  async function handleDeleteDevice(deviceId: number) {
    try {
      await baseFetch(`/devices/${deviceId}`, {
        method: "DELETE",
      });
      await getDevicesByPage(store.state.currentTablePage);
    } catch (error) {
      console.error("handleDeleteDevice error:", error);
      throw error;
    }
  }

  async function handleCreateDevice(device: IDevice) {
    try {
      await baseFetch(`/devices`, {
        method: "POST",
        body: JSON.stringify(device),
      });
      await getDevicesByPage(store.state.currentTablePage);
    } catch (error) {
      console.error("handleCreateDevice error:", error);
      throw error;
    }
  }

  async function handleUpdateDevice(deviceId: number, device: IDevice) {
    try {
      await baseFetch(`/devices/${deviceId}`, {
        method: "PATCH",
        body: JSON.stringify(device),
      });
      await getDevicesByPage(store.state.currentTablePage);
    } catch (error) {
      console.error("handleCreateDevice error:", error);
      throw error;
    }
  }

  return {
    getDevicesByPage,
    getDevicesFilterOptions,
    handleDeleteDevice,
    handleCreateDevice,
    handleUpdateDevice,
  };
}
