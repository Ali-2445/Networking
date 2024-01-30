import { config } from "@/theme/_config";

import type { Gutters } from "@/types/theme/gutters";
import type { ViewStyle } from "react-native";
import { calculateHeight, calculateWidth } from "./utils";

export const generateGutters = (): Gutters => {
  return config.gutters.reduce((acc, curr) => {
    var calculatedHeight = calculateHeight(curr);
    var calculatedWidth = calculateWidth(curr);
    return Object.assign(acc, {
      [`margin_${curr}`]: {
        margin: calculatedWidth,
      },
      [`marginBottom_${curr}`]: {
        marginBottom: calculatedHeight,
      },
      [`marginTop_${curr}`]: {
        marginTop: calculatedHeight,
      },
      [`marginRight_${curr}`]: {
        marginRight: calculatedWidth,
      },
      [`marginLeft_${curr}`]: {
        marginLeft: calculatedWidth,
      },
      [`marginVertical_${curr}`]: {
        marginVertical: calculatedHeight,
      },
      [`marginHorizontal_${curr}`]: {
        marginHorizontal: calculatedWidth,
      },
      [`padding_${curr}`]: {
        padding: calculatedWidth,
      },
      [`paddingBottom_${curr}`]: {
        paddingBottom: calculatedHeight,
      },
      [`paddingTop_${curr}`]: {
        paddingTop: calculatedHeight,
      },
      [`paddingRight_${curr}`]: {
        paddingRight: calculatedWidth,
      },
      [`paddingLeft_${curr}`]: {
        paddingLeft: calculatedWidth,
      },
      [`paddingVertical_${curr}`]: {
        paddingVertical: calculatedHeight,
      },
      [`paddingHorizontal_${curr}`]: {
        paddingHorizontal: calculatedWidth,
      },
    });
  }, {} as Gutters);
};

export const staticGutterStyles = {} as const satisfies Record<
  string,
  ViewStyle
>;
