import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Login, Welcome, TwoFactor, ScanQrPage } from "@/screens";
import { useTheme } from "@/theme";

import type { ApplicationStackParamList } from "@/types/navigation";

import DrawerNavigator from "./DrawerNavigator";
import { calculateHeight } from "@/theme/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { storage } from "@/App";
import { useEffect, useState } from "react";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme, colors } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        key={variant}
        screenOptions={{ headerShown: false }}
        initialRouteName={
          storage.getBoolean("firstTime") == false
            ? "DrawerNavigator"
            : "Welcome"
        }
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TwoFactor" component={TwoFactor} />
        <Stack.Screen
          name="ScanQr"
          component={ScanQrPage}
          options={{
            headerShown: true,
            headerTitle: "Connect Wifi",
            headerStyle: {
              backgroundColor: colors.blue,
              height: calculateHeight(76),
            },
            headerLeft: () => null,
            headerTitleStyle: { fontSize: RFValue(20, 900), fontWeight: "700" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
