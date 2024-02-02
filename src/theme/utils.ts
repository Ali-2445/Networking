import { Dimensions, Platform } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";
import NetInfo from "@react-native-community/netinfo";
import WifiManager from "react-native-wifi-reborn";

const calculateHeight = (fixedHeight: number) => {
  const screenHeight = Dimensions.get("window").height;
  const adjustedHeight = (fixedHeight / 900) * screenHeight;

  return adjustedHeight;
};

const calculateWidth = (fixedWidth: number) => {
  const screenWidth = Dimensions.get("window").width;
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

export {
  calculateHeight,
  calculateWidth,
  aspectRatio,
  LocationPermission,
  getWifiSSID,
};
