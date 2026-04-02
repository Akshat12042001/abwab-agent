import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({color = '#0F172A'}) => (
  <Svg
    width={8}
    height={14}
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1 1L7 7L1 13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
