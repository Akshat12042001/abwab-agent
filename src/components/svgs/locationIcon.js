import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SVGComponent = ({size = 20, color = '#1D4832', ...props}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10 10.8333C11.1506 10.8333 12.0833 9.90064 12.0833 8.75C12.0833 7.59936 11.1506 6.66667 10 6.66667C8.84936 6.66667 7.91667 7.59936 7.91667 8.75C7.91667 9.90064 8.84936 10.8333 10 10.8333Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 18.3333C13.3333 14.1667 16.6667 10.95 16.6667 8.33333C16.6667 4.65167 13.6817 1.66667 10 1.66667C6.31833 1.66667 3.33333 4.65167 3.33333 8.33333C3.33333 10.95 6.66667 14.1667 10 18.3333Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SVGComponent;

