import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Info(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(82)}
      height={props.height || calculateHeight(82)}
      viewBox={`0 0 82 82`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={41}
        cy={41}
        r={30.75}
        stroke="#112F64"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M41 27.333h.034M37.583 41H41v13.667h3.417"
        stroke="#112F64"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Info;
