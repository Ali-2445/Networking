import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Close(props: any) {
  return (
    <Svg
      width={props.width | calculateWidth(20)}
      height={props.height | calculateHeight(20)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 4l-8 8" stroke="#4B465C" />
        <Path d="M12 4l-8 8" stroke="#fff" strokeOpacity={0.5} />
        <G>
          <Path d="M4 4l8 8" stroke="#4B465C" />
          <Path d="M4 4l8 8" stroke="#fff" strokeOpacity={0.5} />
        </G>
      </G>
    </Svg>
  );
}

export default Close;
