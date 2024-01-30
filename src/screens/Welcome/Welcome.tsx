import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import ASL from "@/theme/assets/svgs/ASL";
import Circle from "@/theme/assets/svgs/Circle";
import Button from "@/components/molecules/Button/Button";
import Info from "@/theme/assets/svgs/info";
import CustomModal from "@/components/molecules/Modal/Modal";
import Amp from "@/theme/assets/images/amp.png";

type PermissionStep = "storage" | "camera" | "notification";

function Welcome({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds } = useTheme();
  const { t } = useTranslation(["startup"]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionStep, setPermissionStep] =
    useState<PermissionStep>("storage");

  const showPermissionModal = (step: PermissionStep) => {
    setPermissionStep(step);
    setIsModalVisible(true);
  };

  const handlePermissionClick = () => {
    // Handle the logic for each permission step
    if (permissionStep === "storage") {
      // Handle storage permission logic
      showPermissionModal("camera");
    } else if (permissionStep === "camera") {
      // Handle camera permission logic
      showPermissionModal("notification");
    } else if (permissionStep === "notification") {
      // Handle notification permission logic
      setIsModalVisible(false);
      navigation.navigate("DrawerNavigator");
    }
  };
  //   alert(calculateWidth(217));
  return (
    <SafeScreen>
      <View style={[layout.flex_1, layout.row]}>
        <View
          style={[
            {
              width: calculateWidth(207),
            },
            layout.fullHeight,
            backgrounds.blue,
            layout.justifyCenter,
          ]}
        ></View>
        <View style={[layout.flex_1, backgrounds.offWhite]}>
          <View
            style={{
              marginTop: calculateHeight(123),
              marginLeft: calculateWidth(106),
            }}
          >
            <Text style={[fonts.size_48, fonts[700], fonts.blue]}>SPU-100</Text>
            <Text style={[fonts.size_21, fonts[700], fonts.blue]}>
              non-Portable Piloting Unit
            </Text>
          </View>

          <Image
            source={Amp}
            style={{
              height: calculateHeight(521),
              width: calculateWidth(400),
              resizeMode: "contain",
              marginLeft: "auto",
            }}
          />

          <View
            style={[
              layout.itemsCenter,
              layout.justifyCenter,
              {
                position: "absolute",
                top: calculateHeight(330),
                marginLeft: -calculateWidth(150),
              },
            ]}
          >
            <Circle />
            <ASL style={{ position: "absolute" }} />
          </View>

          <Button
            text="Get Started"
            containerStyle={[
              {
                marginTop: "auto",
                marginLeft: calculateWidth(160),
                marginBottom: calculateHeight(68),
              },
            ]}
            onPress={() => showPermissionModal("storage")}
          />
        </View>
      </View>
      <CustomModal
        onClose={() => setIsModalVisible(false)}
        onPermissionClick={handlePermissionClick}
        isVisible={isModalVisible}
      >
        <View style={[gutters.marginTop_60, layout.itemsCenter]}>
          <Info />
          <Text
            style={[
              fonts.typography,
              fonts.size_22,
              fonts[700],
              gutters.marginTop_20,
            ]}
          >
            {permissionStep === "storage"
              ? "Storage Management Permission"
              : permissionStep === "camera"
              ? "Camera Permission"
              : permissionStep === "notification"
              ? "Notification Permission"
              : "Permission"}
          </Text>
          <Text
            style={[
              fonts.typography,
              fonts.size_18,
              fonts[600],
              gutters.marginTop_12,
              gutters.marginBottom_24,
            ]}
          >
            Do you want to continue ?
          </Text>
        </View>
      </CustomModal>
    </SafeScreen>
  );
}

export default Welcome;
