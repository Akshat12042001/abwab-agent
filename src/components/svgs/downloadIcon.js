import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={18}
    height={14}
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M8.75 6.91667V13.3333M8.75 13.3333L6.6875 11.1945M8.75 13.3333L10.8125 11.1945M3.8 12.2639C1.97746 12.2639 0.5 10.7591 0.5 8.90281C0.5 7.37317 1.50318 6.08222 2.87598 5.67522C2.93432 5.6579 2.975 5.60354 2.975 5.54167C2.975 2.75723 5.19119 0.5 7.925 0.5C10.6588 0.5 12.875 2.75723 12.875 5.54167C12.875 5.59502 12.9241 5.63462 12.9753 5.62297C13.2085 5.56972 13.451 5.54167 13.7 5.54167C15.5225 5.54167 17 7.04647 17 8.90281C17 10.7591 15.5225 12.2639 13.7 12.2639"
      stroke="#1D4832"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
