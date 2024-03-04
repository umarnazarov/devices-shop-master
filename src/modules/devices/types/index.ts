export interface IDevicesState {
  currentTablePage: number;
  tableItemsSize: number | null;
  tableData: IDevice[];
  filterOptionsData: IFilterOption[];
}

export interface IFilterOption {
  text: string;
  value: string;
}

export interface IDevice {
  id: number;
  model: string;
  yearOfRelease: number;
  category: string;
  dateOfAdd: number;
  isVisible: boolean;
  price: number;
  description?: string;
  imgUrl?: string;
}

export enum ModalActionEnum {
  CREATE = "CREATE",
  EDIT = "EDIT",
}
