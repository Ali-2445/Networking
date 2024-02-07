import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NetInfo from "@react-native-community/netinfo";

interface NetInfoState {
  isConnected: boolean;
  routerName: String;
}

const initialState: NetInfoState = {
  isConnected: false,
  routerName: "",
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
  },
});

export const { updateConnectionStatus, updateRouterName } =
  netInfoSlice.actions;

export const fetchNetInfo = () => async (dispatch: any) => {
  const netInfoState = await NetInfo.fetch();
  dispatch(updateConnectionStatus(netInfoState.isConnected));
  dispatch(updateRouterName(netInfoState.routerName));
};

export default netInfoSlice.reducer;
