import { TextStyle } from "react-native";
import type { FontColors, FontSizes } from "@/types/theme/fonts";
import type { UnionConfiguration } from "@/types/theme/config";
import { config } from "@/theme/_config";
import { RFValue } from "react-native-responsive-fontsize";

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          color: value,
        },
      });
    },
    {} as FontColors
  );
};

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        fontSize: RFValue(size, 900),
      },
    });
  }, {} as FontSizes);
};

export const staticFontStyles = {
  bold: {
    fontWeight: "bold",
  },
  "100": {
    fontWeight: "100",
  },
  "200": {
    fontWeight: "200",
  },
  "300": {
    fontWeight: "300",
  },
  "400": {
    fontWeight: "400",
  },
  "500": {
    fontWeight: "500",
  },
  "600": {
    fontWeight: "600",
  },
  "700": {
    fontWeight: "700",
  },
  "800": {
    fontWeight: "800",
  },
  "900": {
    fontWeight: "900",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  alignCenter: {
    textAlign: "center",
  },
} as const satisfies Record<string, TextStyle>;
