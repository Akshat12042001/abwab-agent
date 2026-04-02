import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MinusIcon = ({size = 20, color = '#697586'}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M5 12H19"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MinusIcon;
