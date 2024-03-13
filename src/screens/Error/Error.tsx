import { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StatusBar,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import {
  calculateHeight,
  calculateWidth,
  getValue,
  saveValue,
} from "@/theme/utils";
import ASL from "@/theme/assets/svgs/ASL";
import Button from "@/components/molecules/Button/Button";
import Fan from "@/theme/assets/images/Fan.png";
import { useNavigation } from "@react-navigation/native";
import { request, PERMISSIONS } from "react-native-permissions";

function Error({ navigation }: ApplicationScreenProps) {
  const { navigate } = useNavigation();
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const [qrScanEnabled, setQrScanEnabled] = useState(false);

  const checkQrEnabled = () => {
    const value = getValue("scanEnabled", "boolean");
    if (value === null) {
      setQrScanEnabled(false);
    } else {
      setQrScanEnabled(value);
    }
  };

  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const status = await request(permission);
  };
  const onScanPress = () => {
    requestCameraPermission().then(()=>[
      navigate("ScanQr")

    ])
  };

  const onSettingsPress = async () => {
    const wifiUrl =
      Platform.OS === "ios" ?Linking.canOpenURL("App-Prefs:WIFI") : Linking.sendIntent("android.settings.WIFI_SETTINGS");
    const supported = await wifiUrl;

    if (supported) {
      await Linking.openURL(wifiUrl);
    } else {
      Alert.alert("Unable to open WiFi settings directly on your device.");
    }
  };

  useEffect(() => {
    checkQrEnabled();
  }, []);
  return (
    <SafeScreen>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={[layout.flex_1, backgrounds.offWhite]}>
        <Image
          source={Fan}
          style={{
            height: calculateHeight(900),
            width: calculateWidth(820),
            zIndex: -10,
            tintColor: colors.grayFan,
            position: "absolute",
          }}
          resizeMode="stretch"
        />
        <View style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter]}>
          <View style={[layout.itemsCenter, layout.justifyCenter, layout.row]}>
            <ASL
              height={calculateHeight(35)}
              width={calculateWidth(40)}
              color={colors.blue}
            />
            <Text
              style={[
                fonts.size_26,
                fonts[700],
                fonts.blue,
                gutters.marginLeft_10,
              ]}
            >
              SAL Navigation
            </Text>
          </View>
          <View
            style={[
              layout.fullWidth,
              gutters.marginTop_34,
              gutters.paddingHorizontal_30,
              { alignItems: "center" },
            ]}
          >
            <Text style={[fonts.size_22, fonts[600], fonts.typography]}>
              You are not connected to the device, make sure you are connected
              to the SPU-100 device first.
            </Text>
          </View>
          {qrScanEnabled && (
            <View
              style={[
                { alignItems: "center", justifyContent: "center" },
                layout.fullWidth,
                gutters.marginTop_15,
              ]}
            >
              <Button text={"Scan QR Code"} onPress={onScanPress} />
            </View>
          )}

          <View
            style={[
              { alignItems: "center", justifyContent: "center" },
              layout.fullWidth,
              gutters.marginTop_15,
            ]}
          >
            <Button
              text={"Go To Wifi Settings"}
              onPress={onSettingsPress}
              containerStyle={{ width: calculateWidth(310) }}
            />
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}

export default Error;
