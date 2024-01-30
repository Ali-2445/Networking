import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Search(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(25)}
      height={props.height || calculateHeight(25)}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={10.4167}
        cy={10.4167}
        r={7.29167}
        stroke="#4B465C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={10.4167}
        cy={10.4167}
        r={7.29167}
        stroke="#fff"
        strokeOpacity={0.2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.875 21.875l-6.25-6.25"
        stroke="#4B465C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.875 21.875l-6.25-6.25"
        stroke="#fff"
        strokeOpacity={0.2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Search;
