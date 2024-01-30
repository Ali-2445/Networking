import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function greenCircle(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(10)}
      height={props.height || calculateHeight(10)}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={5} cy={5} r={5} fill="#28C76F" />
      <Circle cx={5} cy={5} r={5} fill="#000" fillOpacity={0.1} />
    </Svg>
  );
}

export default greenCircle;
