import * as React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";
function Devices(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(35)}
      height={props.height || calculateHeight(35)}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        stroke={props.color || "#FFFFFF"}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Rect x={18.9585} y={11.6667} width={11.6667} height={17.5} rx={1} />
        <Path d="M26.25 11.667V7.292c0-.806-.653-1.459-1.458-1.459H5.833c-.805 0-1.458.653-1.458 1.459v17.5c0 .805.653 1.458 1.458 1.458h13.125M23.334 13.125h2.916" />
      </G>
    </Svg>
  );
}

export default Devices;
