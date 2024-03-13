import { createSlice } from "@reduxjs/toolkit";

interface NetInfoState {
  udpData: Array<any>;
  HDTStatus: Boolean;
  GPSStatus: Boolean;

  ROTStatus: Boolean;
  PTMStatus: Boolean;
  AISStatus: Boolean;
  isConnected: Boolean;
  vendorId: string;
}

const initialState: NetInfoState = {
  udpData: [],
  HDTStatus: false,
  GPSStatus: false,
  ROTStatus: false,
  PTMStatus: false,
  AISStatus: false,
  isConnected: false,
  vendorId: "N/A",
};

const udpData = createSlice({
  name: "netInfo",
  initialState,
  reducers: {
    fetchUdpData(state, action) {
      state.udpData.push(action.payload);
    },
    setHDTStatus(state, action) {
      state.HDTStatus = action.payload;
    },
    setGPSStatus(state, action) {
      state.GPSStatus = action.payload;
    },
    setROTStatus(state, action) {
      state.ROTStatus = action.payload;
    },
    setPTMStatus(state, action) {
      state.PTMStatus = action.payload;
    },
    setAISStatus(state, action) {
      state.AISStatus = action.payload;
    },
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
    setUdpVendorId(state, action) {
      state.vendorId = action.payload;
    },
  },
});

export const {
  fetchUdpData,
  setHDTStatus,
  setGPSStatus,
  setROTStatus,
  setPTMStatus,
  setAISStatus,
  setIsConnected,
  setUdpVendorId,
} = udpData.actions;

export default udpData.reducer;
