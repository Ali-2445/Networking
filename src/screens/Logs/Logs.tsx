import { useEffect, useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";

import TableWithPagination from "@/components/molecules/Table/Table";

import Button from "@/components/molecules/Button/Button";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { useQuery } from "@tanstack/react-query";

function Startup({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, colors, backgrounds } = useTheme();
  const { t } = useTranslation(["startup"]);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  const columnTitles = ["LOG FILES", "CREATED DATE", "SIZE", "DURATION"];
  const handleRowSelectionChange = useCallback((selectedRows: number[]) => {},
  []);

  const data = [
    {
      id: 1,
      column1: "LOG FILES 1",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },

    {
      id: 2,
      column1: "LOG FILES 2",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 3,
      column1: "LOG FILES 3",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },

    {
      id: 4,
      column1: "LOG FILES 4",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 5,
      column1: "LOG FILES 5",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 6,
      column1: "LOG FILES 6",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 7,
      column1: "LOG FILES 7",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 8,
      column1: "LOG FILES 8",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 9,
      column1: "LOG FILES 9",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 10,
      column1: "LOG FILES 10",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 11,
      column1: "LOG FILES 11",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 12,
      column1: "LOG FILES 12",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 13,
      column1: "LOG FILES 13",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 14,
      column1: "LOG FILES 14",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 15,
      column1: "LOG FILES 15",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 16,
      column1: "LOG FILES 16",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 17,
      column1: "LOG FILES 17",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 18,
      column1: "LOG FILES 18",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
    {
      id: 19,
      column1: "LOG FILES 19",
      column2: new Date().toDateString(),
      column3: "55 mb",
      column4: "10 m",
    },
  ];
  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          gutters.paddingVertical_15,
          gutters.paddingHorizontal_26,
          backgrounds.white,
        ]}
      >
        <View
          style={[
            layout.fullWidth,
            gutters.paddingLeft_25,
            gutters.marginBottom_10,
            gutters.marginTop_15,
          ]}
        >
          <Text style={[fonts.size_14, fonts[600], fonts.blue]}>
            Log from the application
          </Text>
        </View>
        <TableWithPagination
          data={data}
          itemsPerPage={6}
          columnTitles={columnTitles}
          onRowSelectionChange={handleRowSelectionChange}
        />

        <Button
          text={"Upload to Cloud"}
          containerStyle={[
            styles.buttonStyles,
            { borderColor: colors.blue },
            gutters.marginTop_15,
          ]}
          textStyle={[fonts.blue]}
        />
      </View>
    </SafeScreen>
  );
}

export default Startup;

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: "transparent",
    borderRadius: calculateHeight(6),
    borderWidth: 1,
    alignSelf: "center",
  },
});
