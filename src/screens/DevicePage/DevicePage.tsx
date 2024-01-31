import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";

// import SPU from "@/theme/assets/svgs/SPU";
import SPU from "@/theme/assets/images/SPU.png";
import { useQuery } from "@tanstack/react-query";
import { getDevices } from "@/services/Device";

function DevicePage({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);

  var token = "";
  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["Devices", token],
    queryFn: () => {
      return getDevices(token);
    },
  });

  return (
    <SafeScreen>
      <View style={[layout.flex_1, backgrounds.offWhite]}>
        <View style={[gutters.marginTop_82, gutters.marginLeft_66]}>
          <Text style={[fonts.size_24, fonts[600], fonts.typography]}>
            Devices:
          </Text>
          <View
            style={[
              {
                height: calculateHeight(217),
                width: calculateWidth(295),
                borderRadius: calculateWidth(10),
                borderWidth: 1,
                borderColor: colors.blue,
              },
              layout.itemsCenter,
              layout.justifyCenter,
              gutters.marginTop_81,
            ]}
          >
            {/* <SPU /> */}
            <Image
              source={SPU}
              style={{
                height: calculateHeight(156),
                width: calculateWidth(214),
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}

export default DevicePage;
