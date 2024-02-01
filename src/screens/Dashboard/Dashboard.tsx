import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import DashboardFan from "@/theme/assets/images/DashboardFan.png";
import dgram from "react-native-udp";

import type { ApplicationScreenProps } from "@/types/navigation";
import { Image, View, Text, Pressable } from "react-native";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import CustomPicker from "@/components/molecules/Select/Select";
import { useState, useEffect, useRef } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import HalfCutCircle from "@/theme/assets/svgs/halfCutCircle";
import NumbersCircle from "@/theme/assets/svgs/NumbersCircle";
import Lines from "@/theme/assets/svgs/Lines";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

const logData = [
  "$GNVTG,000.0,T,,M,000.00,N,000.00,K*7E",
  "$PTMSX,0,7,3,1,,,,454325000,0*6A",
  "$PTMSG,0,,,,4,,,*59",
  "$HEROT,-21.5884,A*04 $GNHDT,51,T*05",
  "$GNGGA,,,,,,,,,,M,,M,001.5,*62",
  "$GNVTG,000.0,T,,M,000.00,N,000.00,K*7E",
  "$GNZDA,,,,,00,00*56",
  "$HEROT,-71.7886,A*01",
  "$GNHDT,,T*05 $GNGGA,,,,,,,,,,M,,M,002.0,*64",
  "$PTMSX,0,7,3,1,,,,454325000,0*6A",
  "$PTMSG,0,,,,4,,,*59",
  "$GNVTG,000.0,T,,M,000.00,N,000.00,K*7E",
  "$HEROT,-71.7886,A*01",
  "$GNHDT,,T*05",
  "$GNGGA,,,,,,,,,,M,,M,002.6,*62",
  "$GNVTG,000.0,T,,M,000.00,N,000.00,K*7E",
  "$GNZDA,,,,,00,00*56 $HEROT,-41.0199,A*02 $GNHDT,,T*05",
  "$GNVTG,155.5,T,,M,000.00,N,000.01,K*7B",
  "$GNGGA,144111.00,5917.28986410,N,01020.34346990,E,4,31,0.6,18.837,M,39.889,M,000.1,2014*6A",
  "$GNGSA,A,3,19,24,12,14,17,23,02,10,15,22,13,,1.21,0.59,1.05,1*01",
  "$GNGSA,A,3,76,66,77,84,75,67,68,85,,,,,1.21,0.59,1.05,2*05",
  "$GNGSA,A,3,27,19,34,04,21,,,,,,,,1.21,0.59,1.05,3*04",
  "$GNGSA,A,3,10,07,25,23,41,32,40,,,,,,1.21,0.59,1.05,4*0E",
  "$GNGSA,A,3,,,,,,,,,,,,,1.21,0.59,1.05,5*0F",
  "$GPGSV,4,1,16,02,12,011,41,10,26,304,46,12,25,220,43,13,22,155,42,1*64",
  "$GPGSV,4,2,16,14,20,060,45,15,42,194,46,17,39,078,45,19,36,114,45,1*63",
  "$GPGSV,4,3,16,21,10,000,39,22,39,065,46,23,22,263,43,24,73,253,50,1*65",
  "$GPGSV,4,4,16,32,05,321,42,36,22,165,42,40,13,131,35,49,23,186,42,1*66",
  "$GPGSV,1,1,01,32,05,321,37,5*51",
  "$GPGSV,2,1,07,10,26,304,44,12,25,220,40,14,20,060,42,15,42,194,43,6*6B",
  "$GPGSV,2,2,07,17,39,078,44,23,22,263,43,24,73,253,49,6*5D",
  "$GPGSV,1,1,01,41,00,105,,0*55",
  "$GLGSV,3,1,11,66,29,195,50,67,58,265,52,68,28,329,48,75,10,068,47,1*7D",
  "$GLGSV,3,2,11,76,68,059,52,77,58,256,43,78,02,250,44,84,15,355,37,1*73",
  "$GLGSV,3,3,11,85,30,055,49,86,13,103,48,,,,49,1*74",
  "$GLGSV,3,1,09,66,29,195,47,67,58,265,49,68,28,329,46,75,10,068,42,3*71",
  "$GLGSV,3,2,09,76,68,059,50,77,58,256,42,84,15,355,37,85,30,055,46,3*7D",
  "$GLGSV,3,3,09,86,13,103,42,3*4B",
  "$GAGSV,2,1,07,04,58,270,52,09,18,315,44,15,13,052,44,19,38,174,46,2*7C",
  "$GAGSV,2,2,07,21,70,098,52,27,21,060,45,34,14,002,43,2*45",
  "$GAGSV,2,1,08,04,58,270,48,09,18,315,42,15,13,052,40,19,38,174,40,7*79",
  "$GAGSV,2,2,08,20,,,33,21,70,098,48,27,21,060,43,34,14,002,40,7*43",
  "$GBGSV,2,1,08,07,26,052,42,10,38,065,43,23,70,237,52,24,02,080,39,1*70",
  "$GBGSV,2,2,08,25,54,090,50,32,42,246,48,40,24,038,44,41,13,195,45,1*7D",
  "$GBGSV,1,1,04,07,26,052,45,10,38,065,47,23,70,237,08,40,24,038,12,B*0C",
  "$GBGSV,2,1,06,05,09,128,,20,28,315,,34,24,099,,37,17,256,,0*78",
  "$GBGSV,2,2,06,44,22,042,,60,01,108,,0*79",
  "$GQGSV,1,1,01,03,08,043,36,1*5D",
  "$GQGSV,1,1,01,03,08,043,41,6*5A",
  "$HEROT,+0.0229,A*39",
  "$GNHDT,196.399,T*26",
  "$GNVTG,144.1,T,,M,000.00,N,000.01,K*7F",
  "$PTMSG,0,,,,1,1,,*6D",
  "$GNGGA,144112.00,5917.28986410,N,01020.34347270,E,4,31,0.6,18.839,M,39.889,M,000.6,2014*64",
  "$GNZDA,144112.00,21,11,2023,00,00*7B",
  "$PTMSX,0,2,3,1,31,31,2221,454325000,0*6C",
  "!AIVDM,1,1,,A,402M3>h000Htt<tSF0l4Q@1P0t2s,0*00",
  "$HEROT,+0.0229,A*39",
  "$GNHDT,196.399,T*26",
  "$GNVTG,144.1,T,,M,000.00,N,000.01,K*7F",
  "$GNGGA,144113.00,5917.28986410,N,01020.34347270,E,4,31,0.6,18.839,M,39.889,M,000.1,2014*62",
  "$GNGSA,A,3,19,24,12,14,17,23,02,10,15,22,13,,1.21,0.59,1.05,1*01",
  "$GNGSA,A,3,76,66,77,84,75,67,68,85,,,,,1.21,0.59,1.05,2*05",
  "$GNGSA,A,3,27,19,34,04,21,,,,,,,,1.21,0.59,1.05,3*04",
  "$GNGSA,A,3,10,07,25,23,41,32,40,,,,,,1.21,0.59,1.05,4*0E",
  "$GNGSA,A,3,,,,,,,,,,,,,1.21,0.59,1.05,5*0F",
  "$GPGSV,4,1,16,02,12,011,42,10,26,304,46,12,25,220,44,13,22,155,42,1*60",
  "$GPGSV,4,2,16,14,20,060,45,15,42,194,46,17,39,078,45,19,36,114,45,1*63",
  "$GPGSV,4,3,16,21,10,000,39,22,39,065,46,23,22,263,43,24,73,253,50,1*65",
  "$GPGSV,4,4,16,32,05,321,42,36,22,165,42,40,13,131,35,49,23,186,42,1*66",
  "$GPGSV,1,1,01,32,05,321,37,5*51",
  "$GPGSV,2,1,07,10,26,304,44,12,25,220,40,14,20,060,42,15,42,194,43,6*6B",
  "$GPGSV,2,2,07,17,39,078,44,23,22,263,43,24,73,253,49,6*5D",
  "$GPGSV,1,1,01,41,00,105,,0*55",
  "$GLGSV,3,1,11,66,29,195,50,67,58,265,52,68,28,329,48,75,10,068,47,1*7D",
  "$GLGSV,3,2,11,76,68,059,52,77,58,256,43,78,02,250,44,84,15,355,37,1*73",
  "$GLGSV,3,3,11,85,30,055,49,86,13,103,48,,,,49,1*74",
  "$GLGSV,3,1,09,66,29,195,47,67,58,265,49,68,28,329,46,75,10,068,42,3*71",
  "$GLGSV,3,2,09,76,68,059,50,77,58,256,42,84,15,355,37,85,30,055,46,3*7D",
  "$GLGSV,3,3,09,86,13,103,42,3*4B",
  "$GAGSV,2,1,07,04,58,270,52,09,18,315,44,15,13,052,44,19,38,174,46,2*7C",
  "$GAGSV,2,2,07,21,70,098,52,27,21,060,45,34,14,002,43,2*45",
  "$GAGSV,2,1,08,04,58,270,48,09,18,315,42,15,13,052,39,19,38,174,41,7*76",
  "$GAGSV,2,2,08,20,,,33,21,70,098,48,27,21,060,43,34,14,002,40,7*43",
  "$GBGSV,2,1,08,07,26,052,42,10,38,065,43,23,70,237,52,24,02,080,39,1*70",
  "$GBGSV,2,2,08,25,54,090,50,32,42,246,48,40,24,038,44,41,13,195,45,1*7D",
  "$GBGSV,1,1,04,07,26,052,45,10,38,065,47,23,70,237,08,40,24,038,11,B*0F",
  "$GBGSV,2,1,06,05,09,128,,20,28,315,,34,24,099,,37,17,256,,0*78",
  "$GBGSV,2,2,06,44,22,042,,60,01,108,,0*79",
  "$GQGSV,1,1,01,03,08,043,37,1*5C",
  "$GQGSV,1,1,01,03,08,043,41,6*5A",
  "$HEROT,+0.0107,A*36",
  "$GNHDT,196.396,T*29",
  "$GNVTG,158.8,T,,M,000.00,N,000.01,K*7B",
  "$PTMSG,0,,,,1,1,,*6D",
  "!AIVDM,1,1,,B,13mJIi0P00Pi9PVQqkr>4?vJ25jT,0*4F",
  "$GNGGA,144113.00,5917.28986440,N,01020.34347270,E,4,31,0.6,18.839,M,39.889,M,000.6,2014*60",
  "$GNZDA,144113.00,21,11,2023,00,00*7A",
  "$PTMSX,0,2,3,1,31,31,2221,454325000,0*6C",
  "$HEROT,+0.0107,A*36",
  "$GNHDT,196.396,T*29",
  "$GNVTG,158.8,T,,M,000.00,N,000.01,K*7B",
];

function Dashboard({ navigation }: ApplicationScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  const [selectedValue, setSelectedValue] = useState<string | null>("GPS1");
  const [selectedValue1, setSelectedValue1] = useState<string | null>("UTC1");
  const [selectedValue2, setSelectedValue2] = useState<string | null>("RTK");
  const [selectedChipId, setSelectedChipId] = useState<number | null>(1);
  const [StrArr, setStrArr] = useState<string[]>(logData);

  const [value1, setValue1] = useState(88);
  const [value2, setValue2] = useState(0);
  var [_scrollToBottomY, set_scrollToBottomY] = useState(0);

  const data = [
    { label: "GPS1", value: "GPS1" },
    { label: "UTC1", value: "UTC1" },
    { label: "RTK1", value: "RTK1" },
  ];

  const chips = [
    { name: "Heading", id: 1 },
    { name: "GPS", id: 2 },
    { name: "RTK", id: 3 },
    { name: "AIS", id: 4 },
  ];

  useEffect(() => {
    const socket = dgram.createSocket("udp4");
    socket.bind(17608);
    socket.on("message", function (msg, rinfo) {
      console.log(msg);
      var str = String.fromCharCode.apply(null, new Uint8Array(msg));
      setStrArr((previousData) => [...previousData, str]);
    });
  }, []);
  const getFontSize = (size: number) => {
    return RFValue(size, 1200);
  };

  const filteredData = StrArr.filter((item) => {
    switch (selectedChipId) {
      case 1:
        return item.includes("$HEROT") || item.includes("$GNHDT");
      case 2:
        return item.includes("$GNGGA") || item.includes("$GPG");
      case 3:
        return item.includes("$GNZDA") || item.includes("$PTM");
      case 4:
        return item.includes("!AIV");
      default:
        return true;
    }
  });

  const [number, setNumber] = useState(0);
  const getRandomNumber = () =>
    Math.floor(Math.random() * (100 - -100 + 1)) + -100;

  useEffect(() => {
    const updateState = () => {
      setNumber(getRandomNumber());
    };
    const intervalId = setInterval(updateState, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeScreen>
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
            <View
              style={[
                gutters.padding_10,
                backgrounds.grayBackground,
                layout.itemsCenter,
                {
                  borderRadius: calculateHeight(20),
                  height: calculateHeight(212),

                  width: calculateWidth(260),
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
                      {
                        fontFamily: "NotoSans-Regular",
                        fontSize: getFontSize(72),
                      },

                      fonts.bold,
                      fonts.lightBlack,
                    ]}
                  >
                    {value1 ? 0 : "00"}
                  </Text>
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
                    {value1 || "--"}°
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
                    HDC
                  </Text>
                  <View
                    style={[
                      { height: 1, backgroundColor: colors.lightBlack },
                      layout.fullWidth,
                    ]}
                  />

                  <Text
                    style={[
                      fonts[400],
                      fonts.typography,
                      {
                        fontFamily: "NotoSans-Regular",
                        fontSize: getFontSize(16),
                      },
                    ]}
                  >
                    SRC
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
                      {
                        fontFamily: "NotoSans-Regular",
                        fontSize: getFontSize(72),
                      },

                      fonts.bold,
                      fonts.lightBlack,
                    ]}
                  >
                    {value2 ? 0 : "00"}
                  </Text>
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
                    {value2 || "--"}°
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
                  <View
                    style={[
                      { height: 1, backgroundColor: colors.lightBlack },
                      layout.fullWidth,
                    ]}
                  />

                  <Text
                    style={[
                      fonts[400],
                      fonts.typography,
                      {
                        fontFamily: "NotoSans-Regular",
                        fontSize: getFontSize(16),
                      },
                    ]}
                  >
                    SRC
                  </Text>
                </View>
              </View>
            </View>

            {/*  */}
            <View
              style={[
                {
                  height: calculateHeight(106),
                  width: calculateWidth(260),
                  borderRadius: calculateHeight(20),
                },
                gutters.padding_10,
                backgrounds.grayBackground,
                gutters.marginTop_10,
                layout.justifyCenter,
                layout.itemsCenter,
              ]}
            >
              <View
                style={[
                  layout.row,
                  layout.justifyBetween,
                  ,
                  layout.itemsCenter,
                  gutters.marginBottom_5,
                  { width: calculateWidth(210) },
                ]}
              >
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  -60
                </Text>
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  -40
                </Text>
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  -20
                </Text>
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  0
                </Text>
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  20
                </Text>
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  40
                </Text>
                <Text style={[fonts.size_10, fonts.typography, fonts[500]]}>
                  60
                </Text>
              </View>
              <HalfCutCircle number={number} />
            </View>
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
          >
            <View style={[layout.row, layout.itemsCenter]}>
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { fontSize: getFontSize(12) },
                ]}
              >
                VESSEL NAME
              </Text>
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { marginLeft: "auto", fontSize: getFontSize(12) },
                ]}
              >
                : XXX
              </Text>
            </View>
            <View
              style={[layout.row, layout.itemsCenter, gutters.marginTop_10]}
            >
              <Text
                style={[
                  { fontSize: getFontSize(12) },
                  fonts[400],
                  fonts.typography,
                ]}
              >
                VESSEL IMO
              </Text>
              <Text
                style={[
                  fonts[400],
                  fonts.typography,
                  { marginLeft: "auto", fontSize: getFontSize(12) },
                ]}
              >
                : XXX
              </Text>
            </View>
          </View>

          {/*  */}

          <View
            style={[
              gutters.paddingVertical_10,
              gutters.paddingRight_10,
              backgrounds.grayBackground,
              layout.itemsCenter,
              gutters.marginLeft_62,
              layout.justifyCenter,
              {
                borderRadius: calculateHeight(20),
                height: calculateHeight(303),

                width: calculateWidth(261),
                gap: calculateHeight(10),
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
                  { width: calculateWidth(175) },
                ]}
              >
                <Text
                  style={[
                    fonts[600],
                    fonts.typography,
                    { textAlign: "right", fontSize: getFontSize(24) },
                  ]}
                >
                  41°03.441’ N
                </Text>
                <Text
                  style={[
                    fonts[600],
                    fonts.typography,
                    { textAlign: "right", fontSize: getFontSize(24) },
                  ]}
                >
                  071°16.676’ W
                </Text>
              </View>
              <CustomPicker
                items={data}
                onValueChange={(value: any) => setSelectedValue(value)}
                placeholder="Select an option"
                selectedValue={selectedValue}
              />
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
                  { width: calculateWidth(175) },
                ]}
              >
                <Text
                  style={[
                    fonts[600],
                    fonts.typography,
                    { textAlign: "right", fontSize: getFontSize(24) },
                  ]}
                >
                  14:34:32
                </Text>
                <Text
                  style={[
                    fonts[600],
                    fonts.typography,
                    { textAlign: "right", fontSize: getFontSize(24) },
                  ]}
                >
                  12-Aug-2021
                </Text>
              </View>
              <CustomPicker
                items={data}
                onValueChange={(value: any) => setSelectedValue1(value)}
                placeholder="Select an option"
                selectedValue={selectedValue1}
              />
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
                  { width: calculateWidth(175) },
                ]}
              >
                <Text
                  style={[
                    // fonts.size_24,
                    fonts[600],
                    fonts.typography,
                    { textAlign: "right", fontSize: getFontSize(24) },
                  ]}
                >
                  WIFI RTK
                </Text>
                <Text
                  style={[
                    // fonts.size_24,
                    fonts[600],
                    fonts.typography,
                    { textAlign: "right", fontSize: getFontSize(24) },
                  ]}
                >
                  DATA
                </Text>
              </View>
              <CustomPicker
                items={data}
                onValueChange={(value: any) => setSelectedValue2(value)}
                placeholder="Select an option"
                style={{ width: 200 }} // Add your custom styles here
                selectedValue={selectedValue2}
              />
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
                    width: calculateWidth(90),
                    height: calculateHeight(34),
                  },
                ]}
                key={index}
                onPress={() => setSelectedChipId(item.id)}
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

              scrollViewRef.current?.scrollTo(_scrollToBottomY);
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
    </SafeScreen>
  );
}

export default Dashboard;
