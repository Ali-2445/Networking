import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NetInfo from "@react-native-community/netinfo";

interface NetInfoState {
  isConnected: boolean;
  routerName: String;
  serialNumber: String;
}

const initialState: NetInfoState = {
  isConnected: false,
  routerName: "",
  serialNumber: "",
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
  },
});

export const { updateConnectionStatus, updateRouterName, updateSerialNumber } =
  netInfoSlice.actions;

export default netInfoSlice.reducer;
