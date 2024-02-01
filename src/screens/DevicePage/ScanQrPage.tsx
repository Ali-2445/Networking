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

function ScanQrPage({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const [isScanned, setIsScanned] = useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      console.log(codes);
      if (!isScanned) {
        setIsScanned(true);
        const wifiValues = parseWifiData(codes[0].value);
        if (wifiValues) {
          connectToWifi(wifiValues.S, wifiValues.P).finally(() => {
            setIsScanned(false);
          });
        } else {
          setIsScanned(false);
        }
      }
    },
  });

  const parseWifiData = (qrCodeValue: string | null | undefined) => {
    if (!qrCodeValue) {
      return null;
    }
    const wifiInfo = qrCodeValue.match(/WIFI:S:(.*?);T:(.*?);P:(.*?);H:(.*?);/);
    if (wifiInfo) {
      const [, S, T, P, H] = wifiInfo;
      return { S, T, P, H };
    }
    return null;
  };
  const connectToWifi = async (ssid: string, password: string | null) => {
    console.log(ssid, "  ", password);
    await WifiManager.connectToProtectedSSID(ssid, password, false, false).then(
      () => {
        console.log("Connected successfully!");
      },
      () => {
        console.log("Connection failed!");
      }
    );

    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        console.log("Your current connected wifi SSID is " + ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  const Continue = () => {
    navigation.navigate("Dashboard");
  };

  const LocationPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const status = await request(permission);
    console.log("Location Permission Status:", status, Platform.OS);
  };

  useEffect(() => {
    LocationPermission();
  }, []);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);
  return (
    <SafeScreen>
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
          <View
            style={[layout.itemsCenter, layout.flex_1, layout.justifyCenter]}
          >
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
    </SafeScreen>
  );
}

export default ScanQrPage;

const styles = StyleSheet.create({
  button: {
    width: calculateWidth(94),
    height: calculateHeight(34),
    backgroundColor: "transparent",
    borderRadius: calculateHeight(6),
    borderWidth: 1,
  },
  text: {},
});
