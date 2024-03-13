import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NetInfo from "@react-native-community/netinfo";

interface NetInfoState {
  isConnected: boolean;
  routerName: String;
  serialNumber: String;
  internetReachable: Boolean | null;
  connectionType: String;
}

const initialState: NetInfoState = {
  isConnected: false,
  routerName: "",
  serialNumber: "",
  connectionType: "",
  internetReachable: null,
};

const netInfoSlice = createSlice({
  name: "netInfo",
  initialState,
  reducers: {
    updateConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    updateRouterName(state, action: PayloadAction<string>) {
      state.routerName = action.payload;
    },
    updateSerialNumber(state, action: PayloadAction<string>) {
      state.serialNumber = action.payload;
    },
    setInternetReachable(state, action: PayloadAction<boolean | null>) {
      state.internetReachable = action.payload;
    },
    setConnectionType(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.connectionType = action.payload;
    },
  },
});

export const {
  updateConnectionStatus,
  updateRouterName,
  updateSerialNumber,
  setConnectionType,
  setInternetReachable,
} = netInfoSlice.actions;

export default netInfoSlice.reducer;
