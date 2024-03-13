import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function DropDown(props: any) {
  return (
    <Svg
      width={calculateWidth(24) || props.width}
      height={calculateHeight(25) || props.height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M7 10.5l5 5 5-5H7z" fill="#000" fillOpacity={0.42} />
    </Svg>
  );
}

export default DropDown;
