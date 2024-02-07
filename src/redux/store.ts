import { configureStore } from "@reduxjs/toolkit";
import NetInfoSlice from "./slices/NetInfo.slice";

const store = configureStore({
  reducer: {
    netInfo: NetInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
