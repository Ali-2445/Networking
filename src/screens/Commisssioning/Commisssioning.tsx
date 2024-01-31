import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import Button from "@/components/molecules/Button/Button";
import { Input } from "@/components/molecules";
import Plus from "@/theme/assets/svgs/Plus";
import Search from "@/theme/assets/svgs/Search";
import Laptop from "@/theme/assets/images/laptop.png";
import { useQuery } from "@tanstack/react-query";

import TableWithPagination from "@/components/molecules/Table/Table";
import DropdownOutline from "@/theme/assets/svgs/DropdownOutline";

const Commisssioning: React.FC<ApplicationScreenProps> = ({ navigation }) => {
  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { t } = useTranslation(["startup"]);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const columnTitles = ["DEVICE NAME", "VESSEL NAME", "IMO"];

  const data = [
    {
      id: 1,
      column1: { name: "spu-100-11", image: Laptop, serial: "Device Serial" },
      column2: "TRM-15 Series",
      column3: "Sensors New",
    },
    {
      id: 2,
      column1: { name: "spm-100-11", image: Laptop, serial: "Serial" },
      column2: "LRM-15 Series",
      column3: "Sensors",
    },
  ];

  const sortData = (column: string) => {
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[column]?.name || a[column];
      const valueB = b[column]?.name || b[column];
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    return sortedData;
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Custom Header Rendering Function
  const renderCustomHeader = () => {
    return (
      <View
        style={[
          styles.customHeader,
          backgrounds.white,
          { borderWidth: 1, borderColor: colors.tableHead },
        ]}
      >
        {columnTitles.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.headerCell,
              layout.row,
              layout.justifyBetween,
              gutters.paddingRight_30,
            ]}
            onPress={() => handleSort(`column${index + 1}`)}
          >
            <Text style={[fonts.size_13, fonts[600], fonts.typography]}>
              {item}
            </Text>
            {item != "INFO" && (
              <View>
                <View style={{ transform: [{ rotate: "180deg" }] }}>
                  <DropdownOutline />
                </View>
                <DropdownOutline />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCustomRow = (
    rowData: any,
    isSelected: boolean,
    onRowSelection: any
  ) => {
    return (
      <View style={[styles.customHeader, backgrounds.white]}>
        {Object.keys(rowData).map((item, index) => (
          <>
            {item != "id" && (
              <View key={index} style={styles.headerCell}>
                {item === "column1" ? (
                  <View style={[layout.row, layout.fullWidth]}>
                    <Image
                      source={Laptop}
                      style={{
                        height: calculateHeight(32),
                        width: calculateWidth(32),
                        resizeMode: "contain",
                      }}
                    />
                    <View style={[gutters.marginLeft_10]}>
                      <Text
                        style={[fonts.size_13, fonts[600], fonts.typography]}
                      >
                        {rowData[item]?.name}
                      </Text>
                      <Text
                        style={[fonts.size_13, fonts[400], fonts.typography]}
                      >
                        {rowData[item]?.serial}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={[fonts.size_13, fonts[600], fonts.typography]}>
                    {rowData[item]}
                  </Text>
                )}
              </View>
            )}
          </>
        ))}
      </View>
    );
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          backgrounds.offWhite,
          gutters.padding_20,
          backgrounds.white,
        ]}
      >
        <View
          style={[
            gutters.padding_25,
            layout.fullWidth,
            backgrounds.white,
            { height: calculateHeight(607) },
          ]}
        >
          <View
            style={[
              layout.row,
              layout.fullWidth,
              layout.itemsCenter,
              gutters.marginBottom_22,
            ]}
          >
            <Button
              text="Device"
              icon={<Plus />}
              containerStyle={[
                {
                  borderRadius: calculateHeight(6),
                  width: calculateWidth(150),
                  height: calculateHeight(40),
                },
                gutters.marginRight_5,
              ]}
              textStyle={[gutters.marginLeft_6]}
            />
            <Input
              iconLeft={<Search />}
              containerStyles={{ width: calculateWidth(573) }}
            />
          </View>
          <TableWithPagination
            data={sortColumn ? sortData(sortColumn) : data}
            columnTitles={columnTitles}
            onRowSelectionChange={() => {}}
            showSelectBox={false}
            withPagination={false}
            itemsPerPage={6}
            renderCustomHeader={renderCustomHeader}
            renderCustomRow={renderCustomRow}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  customRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: calculateWidth(17),
    width: "100%",
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: calculateWidth(20),
    paddingVertical: calculateHeight(8),
  },
  headerCell: {
    flex: 1,
    paddingVertical: calculateHeight(8),
    justifyContent: "center",
  },
});

export default Commisssioning;
