import { ref, reactive, computed, watch } from "vue";
import { ModalActionEnum, IDevice } from "../types";
import { useDevices } from "../hooks/use-devices";
import type { FormInstance, FormRules } from "element-plus";

interface Props {
  actionType: ModalActionEnum;
  deviceToEdit?: IDevice | null;
  dialogFormVisible: boolean;
}

interface Emit {
  (event: "update:dialogFormVisible", value: boolean): void;
}

export function useFormDialog(props: Props, emit: Emit) {
  const ruleFormRef = ref<FormInstance>();
  const isLoading = ref(false);
  const formLabelWidth = "140px";

  const form = ref<IDevice>({
    id: new Date().getTime(),
    model: "",
    price: 0,
    yearOfRelease: new Date().getFullYear(),
    dateOfAdd: new Date().getTime(),
    category: "",
    isVisible: false,
  });

  const { handleCreateDevice, handleUpdateDevice } = useDevices();

  const validateReleaseDate = (
    _,
    value: string,
    callback: (error?: Error) => void
  ) => {
    const releaseDate = new Date(value).getTime();
    if (releaseDate > Date.now()) {
      callback(new Error("Release date cannot be in the future"));
    } else {
      callback();
    }
  };

  const validatePrice = (
    _,
    value: string,
    callback: (error?: Error) => void
  ) => {
    if (!value || /^[1-9]\d*(\.\d{1,2})?$/.test(value)) {
      callback();
    } else {
      callback(new Error("Please input a valid price"));
    }
  };

  const formRules = reactive<FormRules<IDevice>>({
    model: [
      {
        required: true,
        message: "Please input the model name",
        trigger: "blur",
      },
    ],
    category: [
      {
        required: true,
        message: "Please select the category",
        trigger: "change",
      },
    ],
    price: [
      {
        required: true,
        message: "Please input the price",
        trigger: "blur",
      },
      { validator: validatePrice, trigger: "blur" },
    ],
    yearOfRelease: [
      {
        required: true,
        message: "Please select the release date",
        trigger: "change",
      },
      { validator: validateReleaseDate, trigger: "change" },
    ],
  });

  watch(
    () => [props.actionType, props.deviceToEdit],
    ([actionType, deviceToEdit]) => {
      if (actionType === ModalActionEnum.CREATE) {
        resetForm();
      } else if (actionType === ModalActionEnum.EDIT && deviceToEdit) {
        if (typeof deviceToEdit === "object" && deviceToEdit !== null) {
          form.value = { ...deviceToEdit };
        }
      }
    }
  );

  const resetForm = () => {
    form.value = {
      id: new Date().getTime(),
      model: "",
      price: 0,
      yearOfRelease: new Date().getFullYear(),
      dateOfAdd: new Date().getTime(),
      category: "",
      isVisible: false,
    };
  };

  const saveDevice = async () => {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value.validate(async (valid, fields) => {
      if (valid) {
        try {
          isLoading.value = true;
          if (props.actionType === ModalActionEnum.CREATE) {
            await handleCreateDevice(form.value);
          } else if (
            props.actionType === ModalActionEnum.EDIT &&
            props.deviceToEdit
          ) {
            await handleUpdateDevice(props.deviceToEdit.id, form.value);
          }
          isLoading.value = false;
          closeModal();
        } catch (e) {
          console.error(e);
        } finally {
          isLoading.value = false;
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const dialogTitle = computed(() => {
    return props.actionType === ModalActionEnum.CREATE
      ? "Create new device"
      : "Edit device";
  });

  const closeModal = () => {
    resetForm();
    if (ruleFormRef.value) ruleFormRef.value.resetFields();
    emit("update:dialogFormVisible", false);
  };

  return {
    ruleFormRef,
    isLoading,
    formLabelWidth,
    form,
    formRules,
    saveDevice,
    dialogTitle,
    closeModal,
  };
}
