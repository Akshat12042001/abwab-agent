import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({size = 44, ...props}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M31.167 24.5663V30.0663C31.167 37.3997 28.2337 40.333 20.9003 40.333H13.9337C6.60033 40.333 3.66699 37.3997 3.66699 30.0663V23.0997C3.66699 15.7663 6.60033 12.833 13.9337 12.833H19.4337"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M31.1669 24.5663H25.3003C20.9003 24.5663 19.4336 23.0997 19.4336 18.6997V12.833L31.1669 24.5663Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.2666 3.66699H28.5999"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.833 9.16699C12.833 6.12366 15.2897 3.66699 18.333 3.66699H23.1363"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M40.3333 14.667V26.0153C40.3333 28.857 38.0233 31.167 35.1816 31.167"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M40.333 14.667H34.833C30.708 14.667 29.333 13.292 29.333 9.16699V3.66699L40.333 14.667Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
