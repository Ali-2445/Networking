import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Logout(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(35)}
      height={props.height || calculateHeight(35)}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.417 11.667V8.75A2.917 2.917 0 0017.5 5.833H7.292A2.917 2.917 0 004.375 8.75v17.5a2.917 2.917 0 002.917 2.917H17.5a2.917 2.917 0 002.917-2.917v-2.917"
        stroke={props.color || "#FFFFFF"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.209 16.5a1 1 0 100 2v-2zm20.416 1v1a1 1 0 00.707-1.707l-.707.707zm-3.668-5.082a1 1 0 00-1.414 1.414l1.414-1.414zm-1.414 8.75a1 1 0 101.414 1.414l-1.414-1.414zm5.79-2.96a1 1 0 00-1.415-1.415l1.414 1.414zm-21.124.292h20.416v-2H10.21v2zm21.123-1.707l-4.375-4.375-1.414 1.414 4.375 4.375 1.414-1.414zm-4.375 5.79l4.375-4.376-1.414-1.414-4.375 4.375 1.414 1.414z"
        fill={props.color || "#FFFFFF"}
      />
    </Svg>
  );
}

export default Logout;
