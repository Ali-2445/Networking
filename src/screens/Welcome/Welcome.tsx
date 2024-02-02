import { useEffect, useState } from "react";
import { Image, Text, View, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import dgram from "react-native-udp";

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
import { request, PERMISSIONS } from "react-native-permissions";
import { storage } from "@/App";

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
  /* useEffect(() => {
    const socket = dgram.createSocket('udp4')
    socket.bind(17608)
socket.on('message', function(msg, rinfo) {
  
  var str = String.fromCharCode.apply(null, new Uint8Array(msg));
  console.log(str)
  const sentences = str.split('\n').map(line => line.trim());
  if(str){
  function nmeaToDecimal(degreesMinutes, direction) {
      const degrees = parseInt(degreesMinutes.substr(0, degreesMinutes.indexOf('.') - 2));
      const minutes = parseFloat(degreesMinutes.substr(degreesMinutes.indexOf('.') - 2));
      let decimalDegrees = degrees + (minutes / 60);
  
      if (direction === 'S' || direction === 'W') {
          decimalDegrees = -decimalDegrees;
      }
  
      return decimalDegrees.toFixed(5);
  }
  
  function extractDateTimeFromGNGGA(sentence) {
      const parts = sentence.split(',');
      if (parts[0] === '$GNGGA' && parts.length > 1 && parts[1]) {
          const time = parts[1].slice(0, 6); // HHMMSS
          const date = new Date(); // Placeholder for the current date
          return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}T${time.substr(0, 2)}:${time.substr(2, 2)}:${time.substr(4, 2)}Z`;
      }
      return "";
  }
  
  function parseGNGGA(sentence) {
      const parts = sentence.split(',');
      return {
          latitude: nmeaToDecimal(parts[2], parts[3]) + '° ' + (parts[3] === 'N' ? 'N' : 'S'),
          longitude: nmeaToDecimal(parts[4], parts[5]) + '° ' + (parts[5] === 'E' ? 'E' : 'W')
      };
  }
  
  // Placeholder for AIS decoding function
  function decodeAIS(aisMessage) {
      // Implement AIS message decoding logic here or use a library
      return {}; // Replace this with the actual decoded data
  }
  
  function parseAIVDM(sentence) {
      const parts = sentence.split(',');
      if (parts[0] === '!AIVDM' && parts.length > 5) {
          const aisData = decodeAIS(parts[5]);
          return {
              ais: aisData,
              ais_raw: sentence // Store the raw AIS data as is
          };
      }
      return {};
  }
  
  function parseGNVTG(sentence) {
      const parts = sentence.split(',');
      return {
          course_over_ground: parts[1]
      };
  }
  
  function parseHEROT(sentence) {
      const parts = sentence.split(',');
      return {
          rate_of_turn: parts[1]
      };
  }
  
  function parseGNHDT(sentence) {
      const parts = sentence.split(',');
      return {
          heading: parts[1]
      };
  }
  
  function initializeGroup() {
      return {
          time: "",
          gngga_raw: "",
          gnvtg_raw: "",
          gnhdt_raw: "",
          ptmsx_raw: "",
          ptmsg_raw: "",
          herot_raw: "",
          gnzda_raw: "",
          ais_raw: "",
          latitude: "",
          longitude: "",
          rate_of_turn: "",
          course_over_ground: "",
          heading: "",
          ais: ""
      };
  }
  
  function groupSentences(sentences) {
      const groupedByTime = new Map();
  
      sentences.forEach(sentence => {
          const type = sentence.split(',')[0];
          const dateTime = (type === '$GNGGA') ? extractDateTimeFromGNGGA(sentence) : null;
  
          if (dateTime) {
              const currentGroup = groupedByTime.get(dateTime) || initializeGroup();
              currentGroup.time = dateTime;
              currentGroup.gngga_raw = sentence;
              Object.assign(currentGroup, parseGNGGA(sentence));
              groupedByTime.set(dateTime, currentGroup);
          } else {
              const latestGroup = Array.from(groupedByTime.values()).pop();
              if (latestGroup) {
                  switch (type) {
                      case '$GNVTG':
                          latestGroup.gnvtg_raw = sentence;
                          Object.assign(latestGroup, parseGNVTG(sentence));
                          break;
                      case '$HEROT':
                          latestGroup.herot_raw = sentence;
                          Object.assign(latestGroup, parseHEROT(sentence));
                          break;
                      case '$GNHDT':
                          latestGroup.gnhdt_raw = sentence;
                          Object.assign(latestGroup, parseGNHDT(sentence));
                          break;
                      case '!AIVDM':
                          const aisParsed = parseAIVDM(sentence);
                          latestGroup.ais_raw = aisParsed.ais_raw; // Store the raw AIS data as is
                          Object.assign(latestGroup, aisParsed);
                          break;
                      // Add cases for other sentence types if needed
                  }
              }
          }
      });
  
      return Array.from(groupedByTime.values()).map(group => ({
          time: group.time,
          latitude: group.latitude,
          longitude: group.longitude,
          rate_of_turn: group.rate_of_turn,
          course_over_ground: group.course_over_ground,
          heading: group.heading,
          ais: group.ais,
          raw: {
              gngga_raw: group.gngga_raw,
              gnvtg_raw: group.gnvtg_raw,
              gnhdt_raw: group.gnhdt_raw,
              ais_raw: group.ais_raw // Include raw AIS data as is
              // Add raw data for other sentence types if needed
          }
      }));
  }
  
  const groupedData = groupSentences(sentences);
  
  if (groupedData.length > 1) {
      const firstTime = new Date(groupedData[0].time);
      const lastTime = new Date(groupedData[groupedData.length - 1].time);
  }
  
 

  
  //onsole.log(groupedData);
}
})
console.log('sssss')
  }, []);*/

  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const status = await request(permission);
  };

  const requestLocationPermission = async () => {
    const cameraPermissionStatus = await requestCameraPermission().finally(
      async () => {
        const permission =
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        const status = await request(permission);
      }
    );
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

  useEffect(() => {
    storage.set("firstTime", false);
    requestCameraPermission();
    requestLocationPermission();
  }, []);
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
        leftButtonClick={() => setIsModalVisible(false)}
        rightButtonClick={handlePermissionClick}
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
