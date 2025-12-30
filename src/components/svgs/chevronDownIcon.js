import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SVGComponent = ({color = '#191D31', size = 20, ...props}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5 7.5L10 12.5L15 7.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SVGComponent;

