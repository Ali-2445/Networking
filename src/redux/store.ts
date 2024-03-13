import { configureStore } from "@reduxjs/toolkit";
import NetInfoSlice from "./slices/NetInfo.slice";
import UDPdataSlice from "./slices/UDPdata.slice";

const store = configureStore({
  reducer: {
    netInfo: NetInfoSlice,
    udpSlice: UDPdataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
