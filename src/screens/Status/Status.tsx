import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, View, Linking } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Status({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();

  const { t } = useTranslation(["startup"]);

  return (
    <View
      style={[
        layout.flex_1,
        backgrounds.white,
        gutters.paddingLeft_17,
        gutters.paddingTop_25,
      ]}
    >
      <Text style={[fonts[600], fonts.size_20, fonts.typography]}>
        NON PORTABLE PILOT UNIT CONNECTION
      </Text>

      <View
        style={[
          layout.row,
          layout.itemsCenter,
          layout.fullWidth,
          gutters.marginTop_15,
        ]}
      >
        <Text
          style={[
            fonts[400],
            fonts.size_20,
            fonts.typography,
            { width: calculateWidth(400) },
          ]}
        >
          SSID
        </Text>
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>
          : spu100_111
        </Text>
      </View>

      <View
        style={[
          layout.row,
          layout.itemsCenter,
          layout.fullWidth,
          gutters.marginTop_15,
        ]}
      >
        <Text
          style={[
            fonts[400],
            fonts.size_20,
            fonts.typography,
            { width: calculateWidth(400) },
          ]}
        >
          Vendor ID
        </Text>
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>: 4</Text>
      </View>

      <View
        style={[
          layout.row,
          layout.itemsCenter,
          layout.fullWidth,
          gutters.marginTop_15,
        ]}
      >
        <Text
          style={[
            fonts[400],
            fonts.size_20,
            fonts.typography,
            { width: calculateWidth(400) },
          ]}
        >
          Device Serial Number
        </Text>
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>: 111</Text>
      </View>

      <View
        style={[
          layout.row,
          layout.itemsCenter,
          layout.fullWidth,
          gutters.marginTop_15,
        ]}
      >
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>
          Status :
        </Text>
        <Text style={[fonts[400], fonts.size_20, fonts.green]}> Connected</Text>
      </View>

      <View
        style={[gutters.marginTop_50, layout.justifyCenter, layout.fullWidth]}
      >
        <View
          style={[
            { width: calculateWidth(350) },
            layout.justifyBetween,
            layout.row,
          ]}
        >
          <Text style={[fonts[400], fonts.size_20, fonts.typography]}>HDT</Text>

          <View
            style={[
              {
                height: calculateWidth(50),
                width: calculateWidth(50),
                backgroundColor: colors.green,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 100,
              },
            ]}
          />
        </View>

        <View
          style={[
            { width: calculateWidth(350) },
            layout.justifyBetween,
            layout.row,
            gutters.marginTop_10,
          ]}
        >
          <Text style={[fonts[400], fonts.size_20, fonts.typography]}>GPS</Text>

          <View
            style={[
              {
                height: calculateWidth(50),
                width: calculateWidth(50),
                backgroundColor: colors.green,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 100,
              },
            ]}
          />
        </View>

        <View
          style={[
            { width: calculateWidth(350) },
            layout.justifyBetween,
            layout.row,
            gutters.marginTop_10,
          ]}
        >
          <Text style={[fonts[400], fonts.size_20, fonts.typography]}>ROT</Text>

          <View
            style={[
              {
                height: calculateWidth(50),
                width: calculateWidth(50),
                backgroundColor: colors.green,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 100,
              },
            ]}
          />
        </View>

        <View
          style={[
            { width: calculateWidth(350) },
            layout.justifyBetween,
            layout.row,
            gutters.marginTop_10,
          ]}
        >
          <Text style={[fonts[400], fonts.size_20, fonts.typography]}>PTM</Text>

          <View
            style={[
              {
                height: calculateWidth(50),
                width: calculateWidth(50),
                backgroundColor: colors.green,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 100,
              },
            ]}
          />
        </View>

        <View
          style={[
            { width: calculateWidth(350) },
            layout.justifyBetween,
            layout.row,
            gutters.marginTop_10,
          ]}
        >
          <Text style={[fonts[400], fonts.size_20, fonts.typography]}>AIS</Text>

          <View
            style={[
              {
                height: calculateWidth(50),
                width: calculateWidth(50),
                backgroundColor: colors.red,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 100,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

export default Status;
