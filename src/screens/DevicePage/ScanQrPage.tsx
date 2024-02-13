import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import Button from "@/components/molecules/Button/Button";

import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from "react-native-vision-camera";
import WifiManager from "react-native-wifi-reborn";
import { PERMISSIONS, request } from "react-native-permissions";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { updateRouterName } from "@/redux/slices/NetInfo.slice";

function ScanQrPage({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation(["startup"]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const [isScanned, setIsScanned] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      if (!isScanned) {
        setIsScanned(true);
        const wifiValues = parseWifiData(codes[0].value);
        console.log(wifiValues);
        if (wifiValues) {
          connectToWifi(
            wifiValues?.S,
            wifiValues?.P,
            wifiValues?.H === "true" ? true : false
          );
        } else {
          setIsScanned(true);

          Alert.alert(
            "Alert",
            "Invalid QR code. Please scan a Wi-Fi QR code.",
            [
              {
                text: "Cancel",
                onPress: () => setIsScanned(false),
                style: "cancel",
              },
              { text: "OK", onPress: () => setIsScanned(false) },
            ]
          );
        }
      }
    },
  });

  const parseWifiData = (qrCodeValue: string | null | undefined) => {
    try {
      if (!qrCodeValue) {
        Alert.alert("QR code value is empty.");
        return;
      }

      if (qrCodeValue) {
        const regex = /([STPH]):([^;]+)/g;

        const extractedValues = {};
        let match;
        while ((match = regex.exec(qrCodeValue)) !== null) {
          var key = match[1];
          const value = match[2];
          extractedValues[key] = value;
        }
        return extractedValues;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  const connectToWifi = async (
    ssid: string,
    password: string | null,
    isHidden: boolean
  ) => {
    // if (ssid.startsWith("spu100")) {
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        WifiManager.disconnectFromSSID(ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
    await WifiManager.connectToProtectedSSID(ssid, password, false, false).then(
      () => {
        dispatch(updateRouterName(ssid));
        navigation.navigate("Dashboard");
      },
      (err) => {
        console.log("Connection failed!");
      }
    );
    // } else {
    //   setIsScanned(true);

    //   Alert.alert(
    //     "Alert",
    //     "Please scan the correct QR code of Wifi Starting with SPU100",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => setIsScanned(false),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => setIsScanned(false) },
    //     ]
    //   );
    // }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const Continue = () => {
    if (isConnected) {
      navigation.navigate("Dashboard");
    } else {
      Alert.alert("Please connect to the internet");
    }
  };

  const LocationPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const status = await request(permission);
  };

  useEffect(() => {
    LocationPermission();
  }, []);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
      LocationPermission();
    }
  }, [hasPermission]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return (
    // <SafeScreen>
    <View
      style={[
        layout.flex_1,
        backgrounds.white,
        gutters.paddingVertical_74,
        gutters.paddingHorizontal_66,
      ]}
    >
      <Text style={[fonts.size_24, fonts.typography, fonts[600]]}>
        CONNECT THE ON BOARD SPU-100 with WIFI
      </Text>

      <View
        style={[
          gutters.marginTop_76,
          layout.fullWidth,
          layout.row,

          { height: calculateHeight(250) },
        ]}
      >
        <View
          style={[
            layout.itemsCenter,
            layout.justifyCenter,
            {
              height: calculateHeight(250),
              width: calculateWidth(300),
              borderWidth: 1,
              borderColor: colors.blue,
              borderRadius: calculateHeight(10),
            },
          ]}
        >
          {device && hasPermission ? (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              codeScanner={codeScanner}
              isActive={true}
            />
          ) : (
            <Text style={[fonts.size_16, fonts.typography, fonts[600]]}>
              Camera
            </Text>
          )}
        </View>
        <View style={[layout.itemsCenter, layout.flex_1, layout.justifyCenter]}>
          <Text
            style={[
              fonts.size_16,
              fonts[600],
              fonts.typography,
              { textAlign: "center" },
            ]}
          >
            SCAN QR CODE AND CONNECT WIFI
          </Text>
          <Text
            style={[
              fonts.size_16,
              fonts[600],
              fonts.typography,
              gutters.marginTop_6,
            ]}
          >
            or
          </Text>
          <Text
            style={[
              fonts.size_16,
              fonts[600],
              fonts.typography,
              gutters.marginTop_6,
              ,
              { textAlign: "center" },
            ]}
          >
            IF YOU ALREADY CONNECTED WIFI
          </Text>

          <View
            style={[
              layout.row,
              layout.fullWidth,
              gutters.marginTop_27,
              layout.justifyCenter,
              { gap: calculateWidth(5) },
            ]}
          >
            <Button
              text="Back"
              containerStyle={[styles.button, { borderColor: colors.blue }]}
              textStyle={[fonts.size_12, fonts.blue, fonts[500]]}
              onPress={onBack}
            />
            <Button
              text="Continue"
              containerStyle={[styles.button, { borderColor: colors.blue }]}
              textStyle={[fonts.size_12, fonts.blue, fonts[500]]}
              onPress={Continue}
            />
          </View>
        </View>
      </View>
    </View>
    // </SafeScreen>
  );
}

export default ScanQrPage;

const styles = StyleSheet.create({
  button: {
    width: calculateWidth(130),
    height: calculateHeight(34),
    backgroundColor: "transparent",
    borderRadius: calculateHeight(6),
    borderWidth: 1,
  },
  text: {},
});
