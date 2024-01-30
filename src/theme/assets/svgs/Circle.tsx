import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Circle(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(223)}
      height={props.height || calculateHeight(219)}
      viewBox="0 0 223 219"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M111.2 218.562c61.415 0 111.2-48.768 111.2-108.925C222.4 49.478 172.615.71 111.2.71 49.785.71 0 49.478 0 109.637c0 60.157 49.785 108.925 111.2 108.925z"
        fill="#112F64"
      />
    </Svg>
  );
}

export default Circle;
