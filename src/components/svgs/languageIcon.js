import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3.33337 4.16699H9.16671"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.50004 2.5V4.16667C7.50004 7.84833 5.63421 10.8333 3.33337 10.8333"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.16675 7.5C4.16425 9.28667 6.62675 10.7567 9.75008 10.8333"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 16.667L13.3333 9.16699L16.6667 16.667"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.9167 15H10.75"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
