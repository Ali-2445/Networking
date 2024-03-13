import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { calculateHeight, calculateWidth } from "@/theme/utils";

function Logs(props: any) {
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
        d="M19.688 14.219a1.093 1.093 0 00-1.094-1.094h-8.75a1.093 1.093 0 100 2.188h8.75a1.093 1.093 0 001.093-1.094zm-1.459 4.375a1.094 1.094 0 00-1.094-1.094H9.844a1.093 1.093 0 100 2.188h7.291a1.093 1.093 0 001.094-1.094zm.365 3.281a1.093 1.093 0 110 2.188h-8.75a1.093 1.093 0 110-2.188h8.75z"
        fill={props.color || "#FFFFFF"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 31.719h18.958a4.01 4.01 0 004.01-4.01v-8.022a1.094 1.094 0 00-1.093-1.093h-4.74V7.208c0-2.075-2.346-3.282-4.035-2.076l-.255.182a3.296 3.296 0 01-3.824-.006 5.498 5.498 0 00-6.376 0 3.296 3.296 0 01-3.823.006l-.256-.182c-1.688-1.206-4.035 0-4.035 2.076V26.25a5.469 5.469 0 005.469 5.469zm3.917-24.632a3.31 3.31 0 013.833 0 5.483 5.483 0 006.367.008l.255-.183a.364.364 0 01.576.296v20.5c0 .657.157 1.276.437 1.823H8.75a3.281 3.281 0 01-3.281-3.281V7.208a.365.365 0 01.576-.296l.255.183a5.483 5.483 0 006.367-.008zm13.218 20.621v-6.927h3.646v6.927a1.823 1.823 0 11-3.646 0z"
        fill={props.color || "#FFFFFF"}
      />
    </Svg>
  );
}

export default Logs;
