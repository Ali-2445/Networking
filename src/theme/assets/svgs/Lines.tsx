import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Lines(props: any) {
  return (
    <Svg
      width={props.width || calculateWidth(196)}
      height={props.height || calculateHeight(79)}
      viewBox="0 0 196 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M174.115 54.568l3.383-1.955m8.393 45.932h3.906m-15.682 43.978l3.383 1.954m-35.553 30.239l1.953 3.385M98 186.5v3.909m-43.945-15.693l-1.953 3.386m-30.217-35.579l-3.383 1.954m-8.393-45.93H6.203m15.681-43.979l-3.382-1.954m35.553-30.24l-1.953-3.385M98 10.591V6.68m43.945 15.693l1.953-3.385"
        stroke="#707070"
      />
    </Svg>
  );
}

export default Lines;
