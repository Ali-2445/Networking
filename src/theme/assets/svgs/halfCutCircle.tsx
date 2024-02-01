import { calculateHeight, calculateWidth } from "@/theme/utils";
import { Svg, Rect, Circle } from "react-native-svg";

const halfCutCircle = ({ number }) => {
  const isPositive = number >= 0;
  const absoluteValue = Math.abs(number);
  const clampedProgress = Math.min(absoluteValue, 50);

  const greenWidth = isPositive ? (clampedProgress / 100) * 50 : 0;
  const redWidth = isPositive ? 0 : (clampedProgress / 100) * 50;

  return (
    <Svg height={calculateHeight(40)} width={calculateWidth(200)}>
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
