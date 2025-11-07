import * as React from 'react';
import Svg, {Polyline} from 'react-native-svg';
const SVGComponent = ({size = '', color = ''}) => (
  <Svg
    fill={color || '#000000'}
    width={size || '800px'}
    height={size || '800px'}
    viewBox="0 0 24 24"
    id="check"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color">
    <Polyline
      id="primary"
      points="5 12 10 17 19 8"
      style={{
        fill: 'none',
        stroke: color || '#000000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
  </Svg>
);
export default SVGComponent;
