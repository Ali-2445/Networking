import { calculateHeight, calculateWidth } from "@/theme/utils";
import { Svg, Rect, Circle } from "react-native-svg";

const halfCutCircle = ({ number, height, width }) => {
  const isPositive = number >= 0;
  const absoluteValue = Math.abs(number);
  const clampedProgress = Math.min(absoluteValue, 50);

  const greenWidth = isPositive ? (clampedProgress / 100) * 100 : 0;
  const redWidth = isPositive ? 0 : (clampedProgress / 100) * 100;

  return (
    <Svg
      height={height || calculateHeight(40)}
      width={width || calculateWidth(710)}
    >
      <Rect width="100%" height="100%" fill="white" />

      <Rect
        x={`${50 - redWidth}%`}
        width={`${redWidth}%`}
        height="100%"
        fill="red"
      />
      <Rect x={`${50}%`} width={`${greenWidth}%`} height="100%" fill="green" />
    </Svg>
  );
};

export default halfCutCircle;
