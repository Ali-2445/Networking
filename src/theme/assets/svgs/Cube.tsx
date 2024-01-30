import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";
function Cube(props: any) {
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
        d="M16.406 2.05l14.219 7.11v17.774l-14.219 7.092-14.218-7.092V9.16l14.218-7.11zm10.681 7.794l-10.68-5.332-4.12 2.05L22.9 11.93l4.187-2.085zm-10.68 5.332l4.067-2.017-10.63-5.366-4.119 2.05 10.681 5.333zM4.374 11.62v13.945l10.938 5.47V17.09L4.374 11.62zM17.5 31.035l10.938-5.469V11.621L17.5 17.09v13.945z"
        fill={props.color || "#FFFFFF"}
      />
    </Svg>
  );
}

export default Cube;
