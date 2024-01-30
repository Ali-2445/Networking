import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function DropdownOutline(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(12)}
      height={props.height || calculateHeight(8)}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.008 7.742c-.282 0-.536-.113-.763-.34L.322 2.43a.932.932 0 01-.274-.673c0-.27.092-.498.274-.68a.937.937 0 01.69-.283c.26 0 .492.1.696.3l4.616 4.68h-.631l4.607-4.68a.974.974 0 01.697-.3.9.9 0 01.672.283.91.91 0 01.283.68c0 .266-.092.49-.274.673L6.764 7.402a1.053 1.053 0 01-.756.34z"
        fill="#112F64"
      />
    </Svg>
  );
}

export default DropdownOutline;
