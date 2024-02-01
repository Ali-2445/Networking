import { calculateHeight, calculateWidth } from "@/theme/utils";
import * as React from "react";
import Svg, { Mask, Path, G, Line } from "react-native-svg";

function HalfCutCircle(props: {
  width?: number;
  height?: number;
  progress: number;
}) {
  const isPositive = props.progress >= 0;

  return (
    <Svg
      width={props.width || calculateWidth(170)}
      height={props.height || calculateHeight(67)}
      viewBox="0 0 170 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M158.21 45.402a.992.992 0 00.366-1.354C143.89 18.64 116.44 1.545 85 1.545c-31.377 0-58.78 17.026-73.487 42.349a.991.991 0 00.364 1.354l25.945 15.063c.484.281 1.103.11 1.385-.374C48.379 44.148 65.46 33.544 85 33.544c19.578 0 36.69 10.647 45.849 26.488.28.484.899.657 1.384.377l25.977-15.008z"
        fill={isPositive ? "#00ff00" : "#ff0000"}
      />
      <Path d="M85 1.545v32" stroke="#D9D9D9" strokeWidth="4" />
    </Svg>
  );
}

export default HalfCutCircle;
