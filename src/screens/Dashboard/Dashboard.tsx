import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import DashboardFan from "@/theme/assets/images/DashboardFan.png";

import type { ApplicationScreenProps } from "@/types/navigation";
import { Image, View, Text, Pressable } from "react-native";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import CustomPicker from "@/components/molecules/Select/Select";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import HalfCutCircle from "@/theme/assets/svgs/halfCutCircle";
import NumbersCircle from "@/theme/assets/svgs/NumbersCircle";
import Lines from "@/theme/assets/svgs/Lines";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

function Dashboard({ navigation }: ApplicationScreenProps) {
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

  const [value1, setValue1] = useState(51);
  const [value2, setValue2] = useState(0);

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
  ];

  const getFontSize = (size: number) => {
    return RFValue(size, 1200);
  };
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
              <View style={{ position: "absolute", top: -calculateHeight(2) }}>
                <NumbersCircle />
              </View>
              <View style={{ position: "absolute", top: calculateHeight(7) }}>
                <Lines />
              </View>
              <HalfCutCircle />
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
            {logData.map((item, index) => (
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
