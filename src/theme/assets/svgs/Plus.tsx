import { calculateHeight, calculateWidth } from "@/theme/utils";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Plus(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(15)}
      height={props.height || calculateHeight(14)}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.5 5.5H9V1a1 1 0 00-1-1H7a1 1 0 00-1 1v4.5H1.5a1 1 0 00-1 1v1a1 1 0 001 1H6V13a1 1 0 001 1h1a1 1 0 001-1V8.5h4.5a1 1 0 001-1v-1a1 1 0 00-1-1z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Plus;
