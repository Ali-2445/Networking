import { calculateHeight, calculateWidth } from "@/theme/utils";
import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function Bell(props: any) {
  return (
    <Svg
      // width={props.width || calculateWidth(27)}
      // height={props.height || calculateHeight(26)}
      width={27}
      height={26}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M11.774 5.417a2.167 2.167 0 014.333 0 7.583 7.583 0 014.334 6.5v3.25a4.333 4.333 0 002.166 3.25H5.274a4.334 4.334 0 002.167-3.25v-3.25a7.583 7.583 0 014.333-6.5" />
        <Path d="M10.69 18.416V19.5a3.25 3.25 0 106.5 0v-1.084" />
      </G>
    </Svg>
  );
}

export default Bell;
