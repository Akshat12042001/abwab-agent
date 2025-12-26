import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={14}
    height={17}
    viewBox="0 0 14 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.75 7.41699H2.41667C1.49619 7.41699 0.75 8.16318 0.75 9.08366V14.0837C0.75 15.0041 1.49619 15.7503 2.41667 15.7503H10.75C11.6705 15.7503 12.4167 15.0041 12.4167 14.0837V9.08366C12.4167 8.16318 11.6705 7.41699 10.75 7.41699Z"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.58333 12.4167C7.04357 12.4167 7.41667 12.0436 7.41667 11.5833C7.41667 11.1231 7.04357 10.75 6.58333 10.75C6.1231 10.75 5.75 11.1231 5.75 11.5833C5.75 12.0436 6.1231 12.4167 6.58333 12.4167Z"
      stroke="#1D4832"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.25 7.41667V4.08333C3.25 3.19928 3.60119 2.35143 4.22631 1.72631C4.85143 1.10119 5.69928 0.75 6.58333 0.75C7.46739 0.75 8.31523 1.10119 8.94036 1.72631C9.56548 2.35143 9.91667 3.19928 9.91667 4.08333V7.41667"
      stroke="#1D4832"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
