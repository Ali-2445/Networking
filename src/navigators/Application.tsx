import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Login, Welcome, TwoFactor, ScanQrPage, Error } from "@/screens";
import { useTheme } from "@/theme";

import type { ApplicationStackParamList } from "@/types/navigation";

import DrawerNavigator from "./DrawerNavigator";
import { calculateHeight } from "@/theme/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { storage } from "@/App";
import { useEffect, useState } from "react";
import { LocationPermission } from "@/theme/utils";
import WifiManager from "react-native-wifi-reborn";
import { useDispatch, useSelector } from "react-redux";
import { updateRouterName } from "@/redux/slices/NetInfo.slice";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const dispatch = useDispatch();
  const { routerName } = useSelector((state: any) => state.netInfo);
  const { variant, navigationTheme, colors } = useTheme();

  useEffect(() => {
    LocationPermission().then(() => {
      WifiManager.getCurrentWifiSSID().then(
        (ssid) => {
          dispatch(updateRouterName(ssid));
        },
        (err) => {
          console.log("Error : ", err);
        }
      );
    });
  }, []);

  let initialRoute =
    storage.getBoolean("firstTime") == false ? "DrawerNavigator" : "Welcome";
  if (initialRoute === "DrawerNavigator") {
    if (!routerName.toLowerCase().startsWith("spu100")) {
      initialRoute = "Error";
    }
  }
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        key={variant}
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TwoFactor" component={TwoFactor} />
        <Stack.Screen name="Error" component={Error} />

        <Stack.Screen
          name="ScanQr"
          component={ScanQrPage}
          options={{
            headerShown: true,
            headerTitle: "Connect Wifi",
            headerStyle: {
              backgroundColor: colors.blue,
            },
            headerLeftLabelVisible: false,
            headerTitleStyle: { fontSize: RFValue(14, 900), fontWeight: "700" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
