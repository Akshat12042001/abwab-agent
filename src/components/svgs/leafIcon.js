import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SVGComponent = ({size = 24, color = '#64748B', ...props}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17 8C15.5 8 14.5 7.5 13.5 6.5C12.5 5.5 12 4.5 12 3C12 4.5 11.5 5.5 10.5 6.5C9.5 7.5 8.5 8 7 8C8.5 8 9.5 8.5 10.5 9.5C11.5 10.5 12 11.5 12 13C12 11.5 12.5 10.5 13.5 9.5C14.5 8.5 15.5 8 17 8Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 13C12 14.5 11.5 15.5 10.5 16.5C9.5 17.5 8.5 18 7 18C8.5 18 9.5 18.5 10.5 19.5C11.5 20.5 12 21.5 12 23C12 21.5 12.5 20.5 13.5 19.5C14.5 18.5 15.5 18 17 18C15.5 18 14.5 17.5 13.5 16.5C12.5 15.5 12 14.5 12 13Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SVGComponent;

