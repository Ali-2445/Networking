import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import ASL from "@/theme/assets/svgs/ASL";
import Button from "@/components/molecules/Button/Button";
import Fan from "@/theme/assets/images/Fan.png";
import { Input } from "@/components/molecules";
import { useQuery } from "@tanstack/react-query";

function TwoFactor({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeScreen>
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
          <View style={[{ width: calculateWidth(370) }, gutters.marginTop_34]}>
            <Text style={[fonts.size_22, fonts[600], fonts.typography]}>
              Please enter 2FA code
            </Text>
            <Text
              style={[
                fonts.size_15,
                fonts[400],
                fonts.typography,
                gutters.marginTop_6,
              ]}
            >
              Two factor authentication (2FA) is enabled for your account Plaase
              entera code to login.
            </Text>
            <Text
              style={[
                fonts.size_15,
                fonts[400],
                fonts.typography,
                gutters.marginTop_26,
              ]}
            >
              Type your 6 digit security code
            </Text>
            <Input phoneVerification={true} />
          </View>
          <Button
            text="Verify my account"
            onPress={() => navigation.navigate("DrawerNavigator")}
            containerStyle={[
              { width: calculateWidth(370), borderRadius: calculateWidth(6) },
              gutters.paddingVertical_10,
              gutters.marginTop_16,
            ]}
          />
        </View>
      </View>
    </SafeScreen>
  );
}

export default TwoFactor;
