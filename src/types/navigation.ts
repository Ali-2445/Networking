import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Startup: undefined;
  Example: undefined;
  Welcome: undefined;
  DevicePage: undefined;
  DrawerNavigator: undefined;
  Login: undefined;
  TwoFactor: undefined;
  Dashboard: undefined;
  Logs: undefined;
  Commisssioning: undefined;
  ScanQr: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
