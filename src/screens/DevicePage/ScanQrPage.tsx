import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import Button from "@/components/molecules/Button/Button";

function ScanQrPage({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);

  const [currentId, setCurrentId] = useState(0);

  const onBack = () => {
    navigation.goBack();
  };

  const Continue = () => {
    navigation.navigate("Dashboard");
  };
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
            <Text style={[fonts.size_16, fonts.typography, fonts[600]]}>
              Camera
            </Text>
          </View>
          <View
            style={[layout.itemsCenter, layout.flex_1, layout.justifyCenter]}
          >
            <Text style={[fonts.size_16, fonts[600], fonts.typography]}>
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
