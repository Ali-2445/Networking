import React, { useEffect, useState } from "react";
import { View, Text, LogBox, Image, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { DevicePage, LogsScreen, Dashboard } from "@/screens";
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

const DrawerNavigator = () => {
  LogBox.ignoreAllLogs();
  const route = useRoute();
  const { backgrounds, colors, fonts, layout, gutters } = useTheme();
  const Drawer = createDrawerNavigator<ApplicationStackParamList>();

  const [initialRouteName, setInitialRouteName] = React.useState<string | null>(
    null
  );
  const [isSpu, setSpu] = useState(false);

  const isItemActive = (routeName: string, currentRouteName: string) => {
    return routeName === currentRouteName;
  };

  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "Dashboard";

  useEffect(() => {
    LocationPermission().then(() => {
      WifiManager.getCurrentWifiSSID().then(
        (ssid) => {
          if (ssid.startsWith("spu100")) {
            setSpu(true);
            setInitialRouteName("Dashboard");
          } else {
            setSpu(false);

            setInitialRouteName("DevicePage");
          }
        },
        () => {
          setInitialRouteName("DevicePage");
          console.log("Error");
        }
      );
    });
  }, []);

  if (initialRouteName === null) {
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
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              marginRight: calculateWidth(20),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <Bell />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{ marginLeft: calculateWidth(16) }}
            >
              <Image
                source={Avatar}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </TouchableOpacity>
          </View>
        ),
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
              if (isSpu) {
                props.navigation.navigate("Dashboard");
              }
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
                fonts.size_20,
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
                fonts.size_20,
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

                backgroundColor: isItemActive(
                  "Commisssioning",
                  focusedRouteName
                )
                  ? colors.white
                  : colors.blue,
              },
            ]}
            onPress={() => {
              if (isSpu) {
                props.navigation.navigate("Commisssioning");
              }
            }}
          >
            <Devices
              color={
                isItemActive("Commisssioning", focusedRouteName)
                  ? colors.blue
                  : colors.white
              }
            />
            <Text
              style={[
                fonts.size_20,
                fonts[400],

                gutters.marginLeft_20,
                isItemActive("Commisssioning", focusedRouteName)
                  ? fonts.blue
                  : fonts.white,
              ]}
            >
              Commisssioning
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
                backgroundColor: isItemActive("Logs", focusedRouteName)
                  ? colors.white
                  : colors.blue,
              },
            ]}
            onPress={() => {
              if (isSpu) {
                props.navigation.navigate("Logs");
              }
            }}
          >
            <Logs
              color={
                isItemActive("Logs", focusedRouteName)
                  ? colors.blue
                  : colors.white
              }
            />
            <Text
              style={[
                fonts.size_20,
                fonts[400],

                gutters.marginLeft_20,
                isItemActive("Logs", focusedRouteName)
                  ? fonts.blue
                  : fonts.white,
              ]}
            >
              Logs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              gutters.paddingHorizontal_20,
              gutters.paddingVertical_10,
              layout.row,
              layout.itemsCenter,
              { width: calculateWidth(270) },
            ]}
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            <Logout />
            <Text
              style={[
                fonts.size_20,
                fonts[400],
                fonts.white,
                gutters.marginLeft_20,
              ]}
            >
              Login
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
