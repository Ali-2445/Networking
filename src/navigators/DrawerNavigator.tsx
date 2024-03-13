import React, { useEffect, useState } from "react";
import { View, Text, LogBox, Image, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { DevicePage, LogsScreen, Dashboard, Status } from "@/screens";
import type { ApplicationStackParamList } from "@/types/navigation";
import { useTheme } from "@/theme";
import Hamburger from "@/theme/assets/svgs/Hamburger";
import { TouchableOpacity } from "react-native-gesture-handler";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { RFValue } from "react-native-responsive-fontsize";
import ASL from "@/theme/assets/svgs/ASL";
import Cube from "@/theme/assets/svgs/Cube";
import Devices from "@/theme/assets/svgs/Devices";
import Logout from "@/theme/assets/svgs/logout";
import Logs from "@/theme/assets/svgs/logs";
import { useRoute } from "@react-navigation/native";
import Commisssioning from "@/screens/Commisssioning/Commisssioning";
import Bell from "@/theme/assets/svgs/Bell";
import Avatar from "@/theme/assets/images/Avatar.png";
import { LocationPermission } from "@/theme/utils";
import { set } from "zod";
import WifiManager from "react-native-wifi-reborn";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnectionType,
  setInternetReachable,
  updateRouterName,
} from "@/redux/slices/NetInfo.slice";
import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";

const DrawerNavigator = () => {
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();
  const { backgrounds, colors, fonts, layout, gutters } = useTheme();
  const { connectionType, internetReachable } = useSelector(
    (state) => state.netInfo
  );
  const Drawer = createDrawerNavigator<ApplicationStackParamList>();
  const [isConnected, setIsConnected] = useState(false);
  const [initialRouteName, setInitialRouteName] = React.useState<string | null>(
    null
  );

  const isItemActive = (routeName: string, currentRouteName: string) => {
    return routeName === currentRouteName;
  };

  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "Dashboard";

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setConnectionType(state.type));

      dispatch(setInternetReachable(state.isInternetReachable));
    });

    NetInfo.fetch().then((state) => {
      dispatch(setConnectionType(state.type));

      dispatch(setInternetReachable(state.isInternetReachable));
    });
    setInitialRouteName("Dashboard");

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    LocationPermission().then(() => {
      WifiManager.getCurrentWifiSSID().then(
        (ssid) => {
          console.log("SSID",ssid)
          dispatch(updateRouterName(ssid));

          // setInitialRouteName("Dashboard");
        },
        (err) => {
          // setInitialRouteName("DevicePage");
          console.log("Error : ", err);
        }
      );
    });
  }, []);

  if (
    initialRouteName === null ||
    connectionType == "" ||
    internetReachable == null
  ) {
    return null;
  }
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerType: "front",
        headerBackgroundContainerStyle: {
          backgroundColor: colors.blue,
          paddingVertical: calculateHeight(12),
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: calculateWidth(20) }}
          >
            <Hamburger />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          fontSize: RFValue(20, 900),
          fontWeight: "700",
          color: colors.white,
        },

        drawerContentContainerStyle: { backgroundColor: colors.blue, flex: 1 },
        drawerStyle: { width: calculateWidth(400) },
      })}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={[
            layout.flex_1,
            backgrounds.blue,
            layout.itemsCenter,
          ]}
          scrollEnabled={false}
        >
          <View style={{ marginTop: calculateHeight(60) }}>
            <ASL height={calculateHeight(200)} width={calculateWidth(200)} />
          </View>
          <View style={{ height: calculateHeight(100) }} />
          <TouchableOpacity
            style={[
              gutters.paddingHorizontal_20,
              gutters.paddingVertical_10,
              layout.row,
              layout.itemsCenter,
              {
                width: calculateWidth(270),
                borderRadius: calculateWidth(12),

                backgroundColor: isItemActive("Dashboard", focusedRouteName)
                  ? colors.white
                  : colors.blue,
              },
            ]}
            onPress={() => {
              props.navigation.navigate("Dashboard");
            }}
          >
            <Cube
              color={
                isItemActive("Dashboard", focusedRouteName)
                  ? colors.blue
                  : colors.white
              }
            />
            <Text
              style={[
                fonts.size_16,
                fonts[400],
                fonts.white,
                gutters.marginLeft_20,
                isItemActive("Dashboard", focusedRouteName)
                  ? fonts.blue
                  : fonts.white,
              ]}
            >
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              gutters.paddingHorizontal_20,
              gutters.paddingVertical_10,
              layout.row,
              layout.itemsCenter,
              {
                width: calculateWidth(270),
                borderRadius: calculateWidth(12),

                backgroundColor: isItemActive("DevicePage", focusedRouteName)
                  ? colors.white
                  : colors.blue,
              },
            ]}
            onPress={() => props.navigation.navigate("DevicePage")}
          >
            <Devices
              color={
                isItemActive("DevicePage", focusedRouteName)
                  ? colors.blue
                  : colors.white
              }
            />
            <Text
              style={[
                fonts.size_16,
                fonts[400],

                gutters.marginLeft_20,
                isItemActive("DevicePage", focusedRouteName)
                  ? fonts.blue
                  : fonts.white,
              ]}
            >
              Device
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              gutters.paddingHorizontal_20,
              gutters.paddingVertical_10,
              layout.row,
              layout.itemsCenter,
              {
                width: calculateWidth(270),
                borderRadius: calculateWidth(12),

                backgroundColor: isItemActive("Status", focusedRouteName)
                  ? colors.white
                  : colors.blue,
              },
            ]}
            onPress={() => {
              props.navigation.navigate("Status");
            }}
          >
            <Logout
              color={
                isItemActive("Status", focusedRouteName)
                  ? colors.blue
                  : colors.white
              }
            />
            <Text
              style={[
                fonts.size_16,
                fonts[400],

                gutters.marginLeft_20,
                isItemActive("Status", focusedRouteName)
                  ? fonts.blue
                  : fonts.white,
              ]}
            >
              Status
            </Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      )}
      initialRouteName={initialRouteName}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="DevicePage"
        component={DevicePage}
        options={{
          title: "Devices",
        }}
      />
      <Drawer.Screen
        name="Commisssioning"
        component={Commisssioning}
        options={{
          title: "Commisssioning",
        }}
      />
      <Drawer.Screen
        name="Logs"
        component={LogsScreen}
        options={{
          title: "Logs",
        }}
      />
      <Drawer.Screen
        name="Status"
        component={Status}
        options={{
          title: "Status",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
