export type User = {
  id: string;
  name: string;
  contactNumber: string;
}

export type Medicine = {
  id: string;
  name: string;
  quantity: number;
}

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  AddNewMedicine: undefined;
  Export: undefined;
};
