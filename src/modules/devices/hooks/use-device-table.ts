import { ref, computed, onMounted } from "vue";
import { useDevicesStore } from "../store/devices-store";
import { useDevices } from "../hooks/use-devices";
import { IDevice, ModalActionEnum } from "../types";

export const useDeviceTable = () => {
  const { state } = useDevicesStore();
  const { getDevicesByPage, getDevicesFilterOptions, handleDeleteDevice } =
    useDevices();

  const search = ref("");
  const selectedDevice = ref<IDevice | null>(null);
  const modalAction = ref(ModalActionEnum.CREATE);
  const modalVisible = ref(false);
  const isLoading = ref(false);
  const pageSize = parseInt(import.meta.env.VITE_BASE_ITEMS_PER_PAGE);

  const handleCurrentPageChange = async () => {
    try {
      isLoading.value = true;
      await getDevicesByPage(state.currentTablePage);
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      console.error(e);
    }
  };

  const filterDataByCategory = (value: string, row: IDevice) =>
    row.category === value;

  const handleEdit = (device: IDevice) => {
    modalVisible.value = true;
    modalAction.value = ModalActionEnum.EDIT;
    selectedDevice.value = device;
  };

  const handleCreate = () => {
    modalVisible.value = true;
    modalAction.value = ModalActionEnum.CREATE;
    selectedDevice.value = null;
  };

  const handleDelete = async (row: IDevice) => {
    try {
      isLoading.value = true;
      await handleDeleteDevice(row.id);
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      console.error(e);
    }
  };

  const filterTableData = computed(() =>
    state.tableData.filter(
      (data) =>
        !search.value ||
        data.model.toLowerCase().includes(search.value.toLowerCase())
    )
  );

  onMounted(async () => {
    try {
      isLoading.value = true;
      await getDevicesByPage();
      await getDevicesFilterOptions();
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      console.error(e);
    }
  });

  return {
    search,
    selectedDevice,
    modalAction,
    modalVisible,
    isLoading,
    pageSize,
    handleCurrentPageChange,
    filterDataByCategory,
    handleEdit,
    handleCreate,
    handleDelete,
    filterTableData,
  };
};
