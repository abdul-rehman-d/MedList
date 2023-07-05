export type User = {
  id: string;
  name: string;
  contactNumber: string;
}

export type Medicine = {
  id: string;
  name: string;
  quantity: string;
}

export type RootStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  EditProfile: undefined;
  AdvancedOptions: undefined;
  About: undefined;
  Export: {
    list: Medicine[];
  };
};
