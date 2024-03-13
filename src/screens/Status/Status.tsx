import React, { useState, useEffect } from "react";
import { Text, View, Switch } from "react-native";

import { useTheme } from "@/theme";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { useSelector } from "react-redux";
import { Input } from "@/components/molecules";
import Button from "@/components/molecules/Button/Button";
import { saveValue, getValue } from "@/theme/utils";

function Status({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const {
    HDTStatus,
    GPSStatus,
    ROTStatus,
    PTMStatus,
    AISStatus,
    isConnected,
    vendorId,
  } = useSelector((state) => state.udpSlice);
  const { routerName, serialNumber } = useSelector((state) => state.netInfo);

  const [isEnabled, setIsEnabled] = useState(false);
  const [offset, setOffSet] = useState("");

  const onToggle = () => {
    saveValue("scanEnabled", !isEnabled);
    setIsEnabled(!isEnabled);
  };

  const getScanValue = async () => {
    const value = getValue("scanEnabled", "boolean");
    if (value === null) {
      saveValue("scanEnabled", false);
    } else {
      setIsEnabled(value);
    }
  };

  const onChangeOffSet = (text: string) => {
    const regex = /^(\+|-)?(\d+)?(\.\d*)?$/;
    if (regex.test(text)) {
      setOffSet(text);
    }
  };

  const setOffSetValue = (value: string) => {
    saveValue("offSetValue", value);
  };

  const getOffSetValue = () => {
    var value = getValue("offSetValue", "string");
    setOffSet(value);
  };

  useEffect(() => {
    getOffSetValue();
    getScanValue();
  }, []);

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
          : {routerName || "N/A"}
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
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>
          : {vendorId}
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
          Device Serial Number
        </Text>
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>
          : {serialNumber || "N/A"}
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
        <Text style={[fonts[400], fonts.size_20, fonts.typography]}>
          Status :
        </Text>
        <Text
          style={[
            fonts[400],
            fonts.size_20,
            isConnected ? fonts.green : fonts.red,
          ]}
        >
          {isConnected ? " Connected" : " Disconnected"}
        </Text>
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
                backgroundColor: HDTStatus ? colors.green : colors.red,
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
                backgroundColor: GPSStatus ? colors.green : colors.red,
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
                backgroundColor: ROTStatus ? colors.green : colors.red,
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
                backgroundColor: PTMStatus ? colors.green : colors.red,
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
                backgroundColor: AISStatus ? colors.green : colors.red,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 100,
              },
            ]}
          />
        </View>

        <View
          style={[
            gutters.marginTop_10,
            layout.itemsCenter,
            layout.row,
            gutters.marginTop_30,
          ]}
        >
          <Text
            style={[
              fonts[400],
              fonts.size_20,
              fonts.typography,
              fonts[600],
              gutters.marginRight_25,
            ]}
          >
            QR Scan Function
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.blue }}
            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onToggle}
            value={isEnabled}
          />
        </View>

        <View
          style={[
            gutters.marginTop_10,
            layout.itemsCenter,
            layout.row,
            gutters.marginTop_30,
            gutters.paddingRight_20,
            { gap: calculateWidth(10) },
          ]}
        >
          <Text
            style={[
              fonts[400],
              fonts.size_20,
              fonts.typography,
              fonts[600],
              { width: calculateWidth(200) },
            ]}
          >
            Heading Offset
          </Text>
          <Input
            containerStyles={{ borderRadius: 5, width: calculateWidth(360) }}
            onChangeText={onChangeOffSet}
            localValue={offset}
          />
          <Button
            text="Set"
            containerStyle={{ width: calculateWidth(150), borderRadius: 5 }}
            onPress={() => setOffSetValue(offset)}
          />
        </View>
      </View>
    </View>
  );
}

export default Status;
