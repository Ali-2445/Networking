import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Hamburger(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(60)}
      height={props.height || calculateHeight(35)}
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.667 9.25h26.666M6.667 18h26.666M6.667 26.75h26.666"
        stroke="#fff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Hamburger;
