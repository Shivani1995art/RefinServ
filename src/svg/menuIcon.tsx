import * as React from "react";
import Svg, { Path } from "react-native-svg";
const menuIcon = (props) => (
  <Svg
   width={props.width || 24}
    height={props.height || 24}
    fill={props.fill || "#FFFFFF"}
    viewBox="-5 -7 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    className="jam jam-menu"
    {...props}
  >
    <Path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
  </Svg>
);
export default menuIcon;
