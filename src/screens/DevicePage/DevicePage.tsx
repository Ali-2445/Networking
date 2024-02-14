import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import NetInfo from "@react-native-community/netinfo";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";

import SPU from "@/theme/assets/images/SPU.png";

import { useIsFocused } from "@react-navigation/native";

import CustomModal from "@/components/molecules/Modal/Modal";
import Info from "@/theme/assets/svgs/info";
import WifiManager from "react-native-wifi-reborn";
import { useDispatch, useSelector } from "react-redux";
import { updateRouterName } from "@/redux/slices/NetInfo.slice";
import { LocationPermission } from "@/theme/utils";
function DevicePage({ navigation }: ApplicationScreenProps) {
  const dispatch = useDispatch();
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { vendorId } = useSelector((state) => state.udpSlice);
  const isFocused = useIsFocused();
  const { t } = useTranslation(["startup"]);
  const [devices, setDevices] = useState([SPU]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deviceNotFOundPage, setIsDeviceNotFound] = useState(
    devices.length == 0
  );
  const [wifiSSID, setWifiSSID] = useState("");
  const [udpConnected, setUdpConnected] = useState(false);
  const [StrArr, setStrArr] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState(false);

  const updateConnectionStatus = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isInternetReachable);
    });
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });

    // Fetch the initial network state
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isInternetReachable);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    updateConnectionStatus();
  }, [isFocused]);

  const handleDevicePress = (index) => {
    setSelectedDevice(index);
  };

  useEffect(() => {
    LocationPermission().then(() => {
      WifiManager.getCurrentWifiSSID().then(
        (ssid) => {
          dispatch(updateRouterName(ssid));
          setWifiSSID(ssid);
        },
        (err) => {
          console.log("Device Page Error", err);
        }
      );
    });
  }, []);
  return (
    // <SafeScreen>
    <ScrollView
      style={[layout.flex_1, backgrounds.offWhite]}
      showsVerticalScrollIndicator={false}
    >
      {true ? (
        <View style={[gutters.marginTop_82, gutters.marginLeft_66]}>
          <Text style={[fonts.size_24, fonts[600], fonts.typography]}>
            Devices:
          </Text>
          {devices &&
            devices.length > 0 &&
            devices.map((device, index) => (
              <View
                key={index}
                style={[
                  {
                    height: calculateHeight(217),
                    width: calculateWidth(295),
                    borderRadius: calculateWidth(10),
                    borderWidth: selectedDevice === index ? 2 : 0,
                    borderColor: colors.blue,
                  },
                  layout.itemsCenter,
                  layout.justifyCenter,
                  gutters.marginTop_81,
                ]}
                onTouchEnd={() => {
                  handleDevicePress(index);

                  if (isConnected) {
                    setIsModalVisible(true);
                    setIsDeviceNotFound(true);
                  } else {
                    // if (wifiSSID.startsWith("spu100")) {
                    navigation.navigate("Dashboard");
                    // } else {
                    //   Alert.alert("Please connect with SPU wifi");
                    //   // navigation.navigate("Dashboard");
                    // }
                  }
                }}
              >
                <Image
                  source={device}
                  style={{
                    height: calculateHeight(156),
                    width: calculateWidth(214),
                  }}
                  resizeMode="contain"
                />
              </View>
            ))}
        </View>
      ) : (
        <View style={[gutters.marginTop_30]}>
          <Text
            style={[
              fonts.size_24,
              fonts[600],
              fonts.typography,
              { alignSelf: "center" },
            ]}
          >
            Device Not Found
          </Text>

          <View
            style={[
              gutters.marginTop_40,
              gutters.marginLeft_40,
              {
                gap: calculateHeight(10),
              },
            ]}
          >
            <Text style={[fonts.size_16, fonts[600], fonts.typography]}>
              CONNECTED WIFI : .......
            </Text>

            <Text style={[fonts.size_16, fonts[600], fonts.typography]}>
              DEVICE ID : ........
            </Text>
            <Text style={[fonts.size_16, fonts[600], fonts.typography]}>
              DEVICE MODEL : ........
            </Text>
          </View>
        </View>
      )}

      {/* <CustomModal
        rightButtonClick={() => {
          setIsModalVisible(false);
          setIsDeviceNotFound(false);
          navigation.navigate("ScanQr");
        }}
        leftButtonClick={() => {
          Linking.openSettings();
          setIsModalVisible(false);
        }}
        isVisible={isModalVisible}
        leftButtonText="Go WIfi Settings"
        rightButtonText="Scan QR Code"
        onClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={[gutters.marginTop_30, layout.itemsCenter]}>
          <Info color={colors.danger} />
          <Text
            style={[
              fonts.typography,
              fonts.size_22,
              fonts[700],
              gutters.marginTop_5,
            ]}
          >
            No Wifi Connection
          </Text>
          <Text
            style={[
              fonts.typography,
              fonts.size_18,
              fonts[600],
              gutters.marginTop_5,
              gutters.marginBottom_24,
              gutters.paddingHorizontal_5,
              { textAlign: "center" },
            ]}
          >
            Please check your wifi connection and try again?
          </Text>
        </View>
      </CustomModal> */}
      <CustomModal
        rightButtonClick={() => {
          setIsModalVisible(false);
          navigation.navigate("ScanQr");
        }}
        leftButtonClick={() => {
          Linking.openSettings();
          setIsModalVisible(false);
        }}
        isVisible={isModalVisible}
        leftButtonText="Go WIfi Settings"
        rightButtonText="Scan QR Code"
        onClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={[gutters.marginTop_1, layout.itemsCenter]}>
          <Info color={colors.danger} style={gutters.marginBottom_1} />
          <Text
            style={[
              fonts.typography,
              fonts.size_22,
              fonts[700],
              gutters.marginTop_20,
            ]}
          >
            Device Not Found
          </Text>
          <Text
            style={[
              fonts.typography,
              fonts.size_18,
              fonts[600],
              gutters.marginTop_12,
              gutters.marginBottom_40,
              gutters.paddingHorizontal_5,
              { textAlign: "center" },
            ]}
          >
            Please check your Device and try again?
          </Text>
        </View>
      </CustomModal>
    </ScrollView>
    // </SafeScreen>
  );
}

export default DevicePage;
