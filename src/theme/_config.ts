import { DarkTheme } from "@react-navigation/native";

import type { ThemeConfiguration } from "@/types/theme/config";

const colorsLight = {
  blue: "rgba(17, 47, 100, 1)",
  white: "rgba(255, 255, 255, 1)",
  backdrop: "rgba(75, 70, 92, 0.5)",
  gray: "rgba(168, 170, 174, 1)",
  lightGray: "rgba(241, 241, 242, 1)",
  typography: "rgba(75, 70, 92, 1)",
  offWhite: "rgba(248, 247, 250, 1)",
  grayFan: "#EAEEF6",
  tableBordre: "rgba(255, 255, 255, 0.6)",
  tableHead: "rgba(75, 70, 92, 0.16)",
  grayBackground: "rgba(231, 231, 231, 0.33)",
  dodgerBlue: "rgba(22, 108, 228, 1)",
  lightBlack: "rgba(0, 0, 0, 0.08)",
  black: "rgba(0, 0, 0, 1)",
  red: "rgba(255, 16, 16, 1)",
} as const;

const colorsDark = {
  blue: "rgba(17, 47, 100, 1)",
  white: "rgba(255, 255, 255, 1)",
  backdrop: "rgba(75, 70, 92, 0.5)",
  gray: "rgba(168, 170, 174, 1)",
  lightGray: "rgba(241, 241, 242, 1)",
  typography: "rgba(75, 70, 92, 1)",
  offWhite: "rgba(248, 247, 250, 1)",
  grayFan: "#EAEEF6",
  tableBorder: "rgba(255, 255, 255, 0.6)",
  tableHead: "rgba(75, 70, 92, 0.16)",
  grayBackground: "rgba(231, 231, 231, 0.33)",
  dodgerBlue: "rgba(22, 108, 228, 1)",
  lightBlack: "rgba(0, 0, 0, 0.08)",
  black: "rgba(0, 0, 0, 1)",
  red: "rgba(255, 16, 16, 1)",
} as const;

const sizes = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
] as const;

export const config = {
  fonts: {
    sizes,
    colors: colorsLight,
  },
  gutters: sizes,
  backgrounds: colorsLight,
  borders: {
    widths: [1, 2],
    radius: [4, 16],
    colors: colorsLight,
  },
  navigationColors: {
    ...DarkTheme.colors,
    background: colorsLight.gray50,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      fonts: {
        colors: colorsDark,
      },
      backgrounds: colorsDark,
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
