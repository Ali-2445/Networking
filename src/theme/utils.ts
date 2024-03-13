import { Dimensions, Platform, PixelRatio } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

import WifiManager from "react-native-wifi-reborn";
import { MMKV } from "react-native-mmkv";
import { boolean } from "zod";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const calculateHeight = (fixedHeight: number) => {
  const adjustedHeight = (fixedHeight / 900) * screenHeight;

  return adjustedHeight;
};

const calculateWidth = (fixedWidth: number) => {
  const adjustedWidth = (fixedWidth / 820) * screenWidth;

  return adjustedWidth;
};

const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;

const LocationPermission = async () => {
  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const status = await request(permission);
};

const getWifiSSID = () => {
  WifiManager.getCurrentWifiSSID().then(
    (ssid) => {
      return ssid;
    },
    () => {
      console.log("Error");
    }
  );
};

const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
};

const saveValue = (key: string, value: string | boolean) => {
  const storage = new MMKV();
  storage.set(key, value);
};

const getValue = (key: string, type: "boolean" | "string") => {
  const storage = new MMKV();
  return type === "boolean" ? storage.getBoolean(key) : storage.getString(key);
};

export {
  calculateHeight,
  calculateWidth,
  aspectRatio,
  LocationPermission,
  getWifiSSID,
  isTablet,
  saveValue,
  getValue,
};
