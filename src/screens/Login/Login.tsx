import { useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth, aspectRatio } from "@/theme/utils";
import ASL from "@/theme/assets/svgs/ASL";
import Button from "@/components/molecules/Button/Button";
import Fan from "@/theme/assets/images/Fan.png";
import { Input } from "@/components/molecules";
import EyeSlash from "@/theme/assets/svgs/EyeSlash";
import CheckBox from "@react-native-community/checkbox";
import { useQuery } from "@tanstack/react-query";

function Login({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });
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
          <ASL color={colors.blue} />
          <Text style={[fonts.size_26, fonts[600], fonts.blue]}>
            Welcome to Service App !
          </Text>
          <Text
            style={[
              fonts.size_18,
              fonts[400],
              fonts.blue,
              gutters.marginTop_10,
            ]}
          >
            Please sign in to your account
          </Text>
          <View style={[gutters.marginTop_16]} />
          <Input title="Email" />
          <View style={[gutters.marginTop_16]} />

          <Input title="Password" icon={<EyeSlash />} />
          <View
            style={[
              layout.row,
              layout.itemsCenter,
              gutters.marginTop_16,
              { width: calculateWidth(430) },
            ]}
          >
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              boxType="square"
              style={{ height: calculateHeight(18), width: calculateWidth(18) }}
            />
            <Text
              style={[
                fonts.size_15,
                fonts[400],
                fonts.blue,
                aspectRatio < 1.6
                  ? gutters.marginLeft_10
                  : gutters.marginLeft_45,
              ]}
            >
              Remember me
            </Text>
          </View>
          <Button
            text="Sign in"
            onPress={() => navigation.navigate("TwoFactor")}
            containerStyle={[
              { width: calculateWidth(430), borderRadius: calculateWidth(6) },
              gutters.paddingVertical_10,
              gutters.marginTop_16,
            ]}
          />
        </View>
      </View>
    </SafeScreen>
  );
}

export default Login;
