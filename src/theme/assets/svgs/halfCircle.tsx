// import * as React from "react";
// import Svg, { Circle, Path } from "react-native-svg";

// function HalfCircle(props: any) {
//   return (
//     <Svg width={200} height={200} xmlns="http://www.w3.org/2000/svg" {...props}>
//       <Path d="M100 100a80 80 0 0180 0" fill="none" />
//       <Path
//         d="M100 100a80 80 0 00-80 0"
//         fill="none"
//         stroke="red"
//         strokeWidth={20}
//       />
//     </Svg>
//   );
// }

// export default HalfCircle;

import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HalfCircle(props: any) {
  return (
    <Svg width={200} height={200} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* First half in green */}
      <Path
        d="M100 100a80 80 0 0180 0"
        fill="none"
        stroke="green"
        strokeWidth={40}
      />

      {/* Second half in red */}
      {/* <Path
        d="M100 100a80 80 0 00-80 0"
        fill="none"
        stroke="red"
        strokeWidth={20}
      /> */}
    </Svg>
  );
}

export default HalfCircle;
