import { calculateHeight, calculateWidth } from "@/theme/utils";
import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function EyeSlash(props: any) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1_14972)">
        <Path
          d="M9.5 13.55c-2.133 0-3.86-1.651-4.02-3.744l-2.95-2.28A9.374 9.374 0 001.499 9.09a.91.91 0 000 .82C3.023 12.887 6.043 14.9 9.5 14.9c.757 0 1.487-.113 2.19-.294l-1.459-1.13a4.061 4.061 0 01-.731.074zm8.826 1.634l-3.11-2.403a9.316 9.316 0 002.286-2.87.91.91 0 000-.822C15.977 6.113 12.957 4.1 9.5 4.1A8.667 8.667 0 005.357 5.16L1.778 2.395a.45.45 0 00-.631.079l-.552.71a.45.45 0 00.079.632l16.547 12.79a.448.448 0 00.632-.08l.552-.71a.45.45 0 00-.079-.632zM13.16 11.19l-1.105-.854a2.665 2.665 0 00-3.266-3.43c.17.23.261.508.262.794-.004.095-.019.19-.043.281l-2.07-1.6A4.002 4.002 0 019.5 5.45a4.048 4.048 0 014.05 4.05c0 .608-.149 1.175-.391 1.69z"
          fill="#112F64"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_14972">
          <Path fill="#fff" transform="translate(.5 .5)" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default EyeSlash;
