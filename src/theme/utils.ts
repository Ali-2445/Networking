import { Dimensions } from "react-native";

const calculateHeight = (fixedHeight: number) => {
  const screenHeight = Dimensions.get("window").height;
  const adjustedHeight = (fixedHeight / 900) * screenHeight;

  return adjustedHeight;
};

const calculateWidth = (fixedWidth: number) => {
  const screenWidth = Dimensions.get("window").width;
  const adjustedWidth = (fixedWidth / 820) * screenWidth;

  return adjustedWidth;
};

const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;

export { calculateHeight, calculateWidth, aspectRatio };
