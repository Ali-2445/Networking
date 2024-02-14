import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import DashboardFan from "@/theme/assets/images/DashboardFan.png";
import dgram from "react-native-udp";

import type { ApplicationScreenProps } from "@/types/navigation";
import { Image, View, Text, Pressable, Linking } from "react-native";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import CustomPicker from "@/components/molecules/Select/Select";
import { useState, useEffect, useRef } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import HalfCutCircle from "@/theme/assets/svgs/halfCutCircle";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import WifiManager from "react-native-wifi-reborn";
import Info from "@/theme/assets/svgs/info";
import { UseDispatch, useDispatch } from "react-redux";
import {
  fetchUdpData,
  setAISStatus,
  setGPSStatus,
  setHDTStatus,
  setIsConnected,
  setPTMStatus,
  setROTStatus,
  setUdpVendorId,
} from "@/redux/slices/UDPdata.slice";
import {
  updateSerialNumber,
  updateRouterName,
} from "@/redux/slices/NetInfo.slice";
import { ScrollEvent } from "react-native-reanimated";

function Dashboard({ navigation }: ApplicationScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch();
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  const [utcTimeGga, setUtcTimeGga] = useState("N/A");
  const [latitudeGga, setLatitudeGga] = useState("N/A");
  const [longitudeGga, setLongitudeGga] = useState("N/A");
  const [fixQuality, setFixQuality] = useState("N/A");
  const [numSatellites, setNumSatellites] = useState("N/A");
  const [horizontalDilution, setHorizontalDilution] = useState("N/A");
  const [altitudeGga, setAltitudeGga] = useState("N/A");
  const [geoidalSeparation, setGeoidalSeparation] = useState("N/A");
  const [ageOfDgpsData, setAgeOfDgpsData] = useState("N/A");
  const [diffRefStationId, setDiffRefStationId] = useState("N/A");

  // State variables for $GNVTG
  const [trueTrackDegreesVtg, setTrueTrackDegreesVtg] = useState("N/A");
  const [magneticTrackDegrees, setMagneticTrackDegrees] = useState("N/A");
  const [speedKnotsVtg, setSpeedKnotsVtg] = useState("N/A");
  const [speedKphVtg, setSpeedKphVtg] = useState("N/A");

  // State variables for $GNZDA
  const [utcTimeZda, setUtcTimeZda] = useState("N/A");
  const [dayZda, setDayZda] = useState("N/A");
  const [monthZda, setMonthZda] = useState("N/A");
  const [yearZda, setYearZda] = useState("N/A");
  const [localZoneHoursZda, setLocalZoneHoursZda] = useState("N/A");
  const [localZoneMinutesZda, setLocalZoneMinutesZda] = useState("N/A");

  // State variables for $HEROT
  const [rateOfTurnHerot, setRateOfTurnHerot] = useState("N/A");
  const [rotStatusHerot, setRotStatusHerot] = useState("N/A");

  // State variables for $GNHDT
  const [trueHeadingHdt, setTrueHeadingHdt] = useState("N/A");

  // State variables for $PTMSX
  const [messageVersion, setMessageVersion] = useState("N/A");
  const [uniqueDeviceId, setUniqueDeviceId] = useState("N/A");
  const [vendorId, setVendorId] = useState("N/A");
  const [modelId, setModelId] = useState("N/A");
  const [gnssPosSatCount, setGnssPosSatCount] = useState("N/A");
  const [gnssHdgSatCount, setGnssHdgSatCount] = useState("N/A");
  const [gnssAntennaBaseline, setGnssAntennaBaseline] = useState("N/A");
  const [uhfFrequency, setUhfFrequency] = useState("N/A");
  const [poweredByBattery, setPoweredByBattery] = useState("N/A");

  const [jammingStatus, setJammingStatus] = useState("N/A");
  const [spoofingStatus, setSpoofingStatus] = useState("N/A");
  const jammingDescriptions = {
    "0": "Not monitoring",
    "1": "No jamming detected",
    "2": "Jamming detected but fix OK",
    "3": "Jamming detected fix invalid",
    "4": "Unknown",
  };
  const [selectedValue, setSelectedValue] = useState<string | null>("GPS1");
  const [selectedValue1, setSelectedValue1] = useState<string | null>("UTC1");
  const [selectedValue2, setSelectedValue2] = useState<string | null>("RTK");
  const [selectedChipId, setSelectedChipId] = useState<number | null>(1);
  const [StrArr, setStrArr] = useState<string[]>([]);
  const [number, setNumber] = useState(0);
  const [points, setPoints] = useState([-60, -30, 0, 30, 60]);

  const [value1, setValue1] = useState(88);
  const [value2, setValue2] = useState(0);
  const [ssid, setSSID] = useState("N/A");
  const [serialNumber, setSerialNumber] = useState(111);
  const [wifiPass, setWifiPass] = useState("salnav213");
  const [usdConnected, setUdpConnected] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState<boolean>(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  var stringArr = [];
  var [_scrollToBottomY, set_scrollToBottomY] = useState(0);

  const data = [
    { label: "GPS1", value: "GPS1" },
    { label: "UTC1", value: "UTC1" },
    { label: "RTK1", value: "RTK1" },
  ];

  const chips = [
    { name: "HDT", id: 1 },
    { name: "GPS", id: 2 },
    { name: "RTK", id: 3 },
    { name: "AIS", id: 4 },
  ];
  function qualityCases(fixQuality) {
    switch (fixQuality) {
      case "0":
        return "Fix Not Valid";
      case "1":
        return "GPS fixed";
      case "2":
        return "SBAS";
      case "3":
        return "NA";
      case "4":
        return "RTK Fixed";
      case "5":
        return "RTK Float";
      default:
        return "";
    }
  }

  useEffect(() => {
    const socket = dgram.createSocket({
      type: "udp4",
      debug: true,
    });
    socket.bind(17608, function () {
      dispatch(setIsConnected(false));
      dispatch(setHDTStatus(false));
      dispatch(setGPSStatus(false));
      dispatch(setPTMStatus(false));
      dispatch(setAISStatus(false));
      dispatch(setROTStatus(false));
    });
    socket.on("message", function (msg, rinfo) {
      if (rinfo.port == "60183") {
        const message = msg.toString();

        const parts = message.split(",");
        if (
          parts[0] === "$PTMSX" && parts[3] != "4"
            ? parts[0] == "$PTMSX"
              ? true
              : true
            : false
        ) {
          dispatch(setIsConnected(false));
          dispatch(setHDTStatus(false));
          dispatch(setGPSStatus(false));
          dispatch(setPTMStatus(false));
          dispatch(setAISStatus(false));
          dispatch(setROTStatus(false));
          socket.close();
        } else {
          dispatch(setIsConnected(true));

          var str = String.fromCharCode.apply(null, new Uint8Array(msg));

          setStrArr((previousData) => [...previousData, str]);
          dispatch(fetchUdpData(str));
          stringArr.push(str);

          dispatch(
            setHDTStatus(stringArr.some((string) => string.includes("$GNHDT")))
          );
          dispatch(
            setGPSStatus(
              stringArr.some((string) => string.includes("$G" || "$GNHDT"))
            )
          );
          dispatch(
            setPTMStatus(stringArr.some((string) => string.includes("$PTM")))
          );
          dispatch(
            setAISStatus(stringArr.some((string) => string.includes("!AIV")))
          );
          dispatch(
            setROTStatus(stringArr.some((string) => string.includes("$HEROT")))
          );
          switch (parts[0]) {
            case "$GNGGA":
              setUtcTimeGga(parts[1]);
              setLatitudeGga(parts[2] + " " + parts[3]);
              setLongitudeGga(parts[4] + " " + parts[5]);
              setFixQuality(qualityCases(parts[6]));
              setNumSatellites(parts[7]);
              setHorizontalDilution(parts[8]);
              setAltitudeGga(parts[9] + " " + parts[10]);
              setGeoidalSeparation(parts[11] + " " + parts[12]);
              setAgeOfDgpsData(parts[13]);
              setDiffRefStationId(parts[14]);
              break;
            case "$GNVTG":
              setTrueTrackDegreesVtg(parts[1] + " " + parts[2]);
              setMagneticTrackDegrees(parts[3] + " " + parts[4]);
              setSpeedKnotsVtg(parts[5] + " " + parts[6]);
              setSpeedKphVtg(parts[7] + " " + parts[8].split("*")[0]);
              break;
            case "$GNZDA":
              setUtcTimeZda(parts[1]);
              setDayZda(parts[2]);
              setMonthZda(parts[3]);
              setYearZda(parts[4]);
              setLocalZoneHoursZda(parts[5]);
              setLocalZoneMinutesZda(parts[6].split("*")[0]);
              break;
            case "$HEROT":
              setRateOfTurnHerot(parts[1]);
              setRotStatusHerot(parts[2].split("*")[0]);
              break;
            case "$GNHDT":
              setTrueHeadingHdt(parts[1] + " " + parts[2].split("*")[0]);
              break;
            case "$PTMSX":
              dispatch(setUdpVendorId(parts[3]));
              dispatch(updateSerialNumber(parts[2]));
              setMessageVersion(parts[1]);
              setUniqueDeviceId(parts[2]);
              setVendorId(parts[3]);
              setModelId(parts[4]);
              setGnssPosSatCount(parts[5]);
              setGnssHdgSatCount(parts[6]);
              setGnssAntennaBaseline(parts[7]);
              setUhfFrequency(parts[8]);
              setPoweredByBattery(parts[9].charAt(0)); // Assuming the battery indicator is the first character before the checksum
              break;
            case "$PTMSG":
              setMessageVersion(parts[1]);
              // parts[2], parts[3], and parts[4] are N/A and therefore not used
              setJammingStatus(parts[5]); // Make sure to convert this to the description using a function or a map
              setSpoofingStatus(parts[6]); // Convert this to the description similarly
              // parts[7] and parts[8] are N/A and not used
              // Checksum is typically not stored in state as it's used for validating the message
              setJammingStatus(jammingDescriptions[parts[5]] || "Unknown");
              break;
          }
        }
      } else {
        dispatch(setIsConnected(false));
        dispatch(setHDTStatus(false));
        dispatch(setGPSStatus(false));
        dispatch(setPTMStatus(false));
        dispatch(setAISStatus(false));
        dispatch(setROTStatus(false));
      }
    });
  }, []);
  const getFontSize = (size: number) => {
    return RFValue(size, 1200);
  };

  let filteredData = StrArr.filter((item) => {
    switch (selectedChipId) {
      case 1:
        return item.includes("$HEROT") || item.includes("$GNHDT");
      case 2:
        return item.includes("$G") || item.includes("$G");
      case 3:
        return item.includes("$PTM");
      case 4:
        return item.includes("!AIV");
      default:
        return true;
    }
  });

  const getWifiInfo = async () => {
    await WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        setSSID(ssid);
        dispatch(updateRouterName(ssid));
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    setIsScrolledUp(
      contentSize.height - layoutMeasurement.height >
        contentOffset.y + paddingToBottom
    );
  };

  const handleScrollBeginDrag = () => {
    setIsDragging(true);
  };

  const handleScrollEndDrag = () => {
    setIsDragging(false);
  };

  const handleToggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);

    // If auto-scroll is enabled and user is not scrolled up and not dragging, scroll to the end
    if (autoScrollEnabled && !isScrolledUp && !isDragging) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    if (!isScrolledUp && autoScrollEnabled && !isDragging) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [StrArr, selectedChipId, autoScrollEnabled, isDragging]);

  const getRandomNumber = () =>
    Math.floor(Math.random() * (60 - -60 + 1)) + -60;

  useEffect(() => {
    getWifiInfo();
    const updateState = () => {
      setNumber(getRandomNumber());
    };
    const intervalId = setInterval(updateState, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    // <SafeScreen>
    <View
      style={[
        layout.flex_1,
        gutters.paddingHorizontal_36,
        gutters.paddingVertical_30,
        backgrounds.white,
      ]}
    >
      <Image
        source={DashboardFan}
        style={{
          height: calculateHeight(900),
          width: calculateWidth(820),
          zIndex: -10,
          position: "absolute",
        }}
      />
      <View style={[layout.row, layout.fullWidth]}>
        <View>
          <Text style={[fonts.size_16, fonts.typography, fonts[600]]}>
            Vendor ID : {vendorId}
          </Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <Text style={[fonts.size_16, fonts.typography, fonts[600]]}>
            Device Serial Number : {uniqueDeviceId}
          </Text>
        </View>
      </View>
      <View style={[layout.row, layout.fullWidth]}>
        <View
          style={[
            {
              height: calculateHeight(106),
              borderRadius: calculateHeight(20),
            },
            gutters.padding_10,
            backgrounds.grayBackground,
            gutters.marginTop_10,
            layout.justifyCenter,
            layout.itemsCenter,
            layout.fullWidth,
          ]}
        >
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              ,
              layout.itemsCenter,
              gutters.marginBottom_2,
              { width: calculateWidth(710) },
              // gutters.marginRight_15,
            ]}
          >
            {points.map((point: number, index: number) => (
              <View
                style={[
                  layout.itemsCenter,
                  layout.justifyCenter,
                  point == 0 && gutters.marginRight_15,
                ]}
              >
                <Text style={[fonts.size_12, fonts.typography, fonts[700]]}>
                  {point}
                </Text>
                <Text style={[fonts.size_12, fonts.typography, fonts[700]]}>
                  |
                </Text>
              </View>
            ))}
          </View>
          <HalfCutCircle number={rateOfTurnHerot} />
          <Text
            style={[
              fonts[600],
              fonts.typography,
              gutters.marginTop_10,
              {
                fontFamily: "NotoSans-Regular",
                fontSize: getFontSize(16),
              },
            ]}
          >
            ROT
          </Text>
        </View>
      </View>
      <View style={[layout.row, layout.fullWidth]}>
        <View>
          <View
            style={[
              gutters.padding_10,
              backgrounds.grayBackground,
              layout.itemsCenter,
              {
                borderRadius: calculateHeight(20),
                height: calculateHeight(212),

                width: calculateWidth(400),
              },
            ]}
          >
            <View style={[layout.flex_1, layout.row]}>
              <View
                style={[
                  layout.flex_1,
                  gutters.paddingHorizontal_8,
                  layout.row,
                  layout.itemsCenter,
                  layout.justifyCenter,
                ]}
              >
                <Text
                  style={[
                    fonts.bold,
                    fonts.dodgerBlue,
                    {
                      fontFamily: "NotoSans-Regular",
                      fontSize: getFontSize(72),
                    },
                  ]}
                >
                  {Math.round(parseFloat(trueHeadingHdt) * 10) / 10 || "--"}°
                </Text>
              </View>
              <View
                style={[
                  {
                    height: calculateHeight(77),

                    alignSelf: "center",
                  },
                  layout.itemsCenter,
                  layout.justifyAround,
                ]}
              >
                <Text
                  style={[
                    fonts[600],
                    fonts.typography,
                    {
                      fontFamily: "NotoSans-Regular",
                      fontSize: getFontSize(16),
                    },
                  ]}
                >
                  HDT
                </Text>
              </View>
            </View>

            {/*  */}
            <View style={[layout.flex_1, layout.row]}>
              <View
                style={[
                  layout.flex_1,
                  gutters.paddingHorizontal_8,
                  layout.row,
                  layout.itemsCenter,
                  layout.justifyCenter,
                ]}
              >
                <Text
                  style={[
                    fonts.bold,
                    fonts.dodgerBlue,
                    {
                      fontFamily: "NotoSans-Regular",
                      fontSize: getFontSize(72),
                    },
                  ]}
                >
                  {Math.round(parseFloat(trueTrackDegreesVtg) * 10) / 10 ||
                    "--"}
                  °
                </Text>
              </View>
              <View
                style={[
                  {
                    height: calculateHeight(77),

                    alignSelf: "center",
                  },
                  layout.itemsCenter,
                  layout.justifyAround,
                ]}
              >
                <Text
                  style={[
                    fonts[600],
                    fonts.typography,
                    {
                      fontFamily: "NotoSans-Regular",
                      fontSize: getFontSize(16),
                    },
                  ]}
                >
                  COG
                </Text>
              </View>
            </View>
          </View>

          {/*  */}
        </View>
        {/*  */}

        <View
          style={[
            gutters.paddingVertical_15,
            gutters.paddingHorizontal_10,
            backgrounds.grayBackground,

            gutters.marginLeft_15,
            {
              borderRadius: calculateHeight(20),
              height: calculateHeight(68),
            },
          ]}
        ></View>

        {/*  */}

        <View
          style={[
            gutters.paddingVertical_10,
            gutters.paddingRight_10,
            backgrounds.grayBackground,
            layout.itemsCenter,
            gutters.marginLeft_10,
            layout.justifyCenter,
            {
              borderRadius: calculateHeight(20),
              height: calculateHeight(303),

              width: calculateWidth(325),
              gap: calculateHeight(30),
            },
          ]}
        >
          {/*  */}

          <View
            style={[
              layout.row,
              layout.itemsCenter,
              layout.fullWidth,
              { height: calculateHeight(72) },
            ]}
          >
            <View
              style={[
                layout.fullHeight,
                layout.justifyCenter,
                { width: calculateWidth(225) },
              ]}
            >
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { textAlign: "right", fontSize: getFontSize(16) },
                ]}
              >
                {`${parseInt(latitudeGga.substring(0, 2))}° ${parseInt(
                  latitudeGga.substring(2, 4)
                )}' ${(
                  parseFloat(latitudeGga.substring(4, latitudeGga.length - 1)) *
                  60
                ).toFixed(2)}" ${latitudeGga.slice(-1)}`}
              </Text>
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { textAlign: "right", fontSize: getFontSize(16) },
                ]}
              >
                {`${parseInt(longitudeGga.substring(0, 3))}° ${parseInt(
                  longitudeGga.substring(3, 5)
                )}' ${(
                  parseFloat(
                    longitudeGga.substring(5, longitudeGga.length - 1)
                  ) * 60
                ).toFixed(2)}" ${longitudeGga.slice(-1)}`}
              </Text>
            </View>
            <Text
              style={[
                fonts[600],
                fonts.typography,
                { textAlign: "right", fontSize: getFontSize(22) },
                gutters.marginLeft_5,
              ]}
            >
              GPS
            </Text>
          </View>

          {/*  */}

          <View
            style={[
              layout.row,
              layout.itemsCenter,
              layout.fullWidth,
              { height: calculateHeight(72) },
            ]}
          >
            <View
              style={[
                layout.fullHeight,
                layout.justifyCenter,
                { width: calculateWidth(225) },
              ]}
            >
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { textAlign: "right", fontSize: getFontSize(16) },
                ]}
              >
                {utcTimeZda.substring(0, 2)}:{utcTimeZda.substring(2, 4)}:
                {utcTimeZda.substring(4, 6)}
              </Text>
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { textAlign: "right", fontSize: getFontSize(16) },
                ]}
              >
                {dayZda}.
                {
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][parseInt(monthZda, 10) - 1]
                }
                .{yearZda}
              </Text>
            </View>

            <Text
              style={[
                fonts[600],
                fonts.typography,
                { textAlign: "right", fontSize: getFontSize(22) },
                gutters.marginLeft_5,
              ]}
            >
              UTC
            </Text>
          </View>

          {/*  */}

          <View
            style={[
              layout.row,
              layout.itemsCenter,
              layout.fullWidth,

              { height: calculateHeight(72) },
            ]}
          >
            <View
              style={[
                layout.fullHeight,
                layout.justifyCenter,
                { width: calculateWidth(225) },
              ]}
            >
              <Text
                style={[
                  // fonts.size_24,
                  fonts[400],
                  fonts.typography,
                  { textAlign: "right", fontSize: getFontSize(16) },
                ]}
              >
                GPS Q.IND
              </Text>
              <Text
                style={[
                  // fonts.size_24,
                  fonts[400],
                  fonts.typography,
                  { textAlign: "right", fontSize: getFontSize(16) },
                ]}
              >
                {fixQuality}
              </Text>
            </View>
            <Text
              style={[
                fonts[600],
                fonts.typography,
                { textAlign: "right", fontSize: getFontSize(22) },
                gutters.marginLeft_5,
              ]}
            >
              RTK
            </Text>
          </View>
        </View>
      </View>

      <View style={[layout.flex_1, gutters.marginTop_100]}>
        <View
          style={[
            layout.fullWidth,
            layout.row,
            gutters.marginBottom_10,
            ,
            { gap: calculateWidth(10) },
          ]}
        >
          {chips.map((item, index) => (
            <Pressable
              style={[
                layout.itemsCenter,
                layout.justifyCenter,

                {
                  borderWidth: 1,
                  borderColor:
                    item.id === selectedChipId ? colors.red : colors.blue,
                  borderRadius: calculateHeight(6),
                  width: calculateWidth(110),
                  height: calculateHeight(34),
                },
              ]}
              key={index}
              onPress={() => {
                if (item.id == selectedChipId) filteredData = StrArr;
                else setSelectedChipId(item.id);
              }}
            >
              <Text style={[fonts.size_12, fonts.blue, fonts[500]]}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            set_scrollToBottomY(contentHeight);
            if (!isScrolledUp && autoScrollEnabled && !isDragging) {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }
          }}
          style={[
            {
              borderWidth: 1,
              borderColor: colors.blue,
              borderRadius: calculateHeight(20),
            },
          ]}
          contentContainerStyle={[
            gutters.paddingLeft_15,
            gutters.paddingRight_25,
            gutters.paddingVertical_15,
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={20}
        >
          {filteredData.map((item, index) => (
            <Text
              key={index}
              style={[fonts.size_16, fonts.blue, fonts[600], fonts.black]}
            >
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
    // </SafeScreen>
  );
}

export default Dashboard;
