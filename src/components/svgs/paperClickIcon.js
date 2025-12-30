import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({color = '#292D32', ...props}) => (
  <Svg
    width={16}
    height={21}
    viewBox="0 0 16 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M7.75 9.75V13.25C7.75 15.18 9.32 16.75 11.25 16.75C13.18 16.75 14.75 15.18 14.75 13.25V7.75C14.75 3.88 11.62 0.75 7.75 0.75C3.88 0.75 0.75 3.88 0.75 7.75V13.75C0.75 17.06 3.44 19.75 6.75 19.75"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
