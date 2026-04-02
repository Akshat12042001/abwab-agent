import React from 'react';
import {StarFilledIcon, StarHalfFilledIcon} from '../components/svgs';

export default function renderStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < full && i < 5; i++) {
    stars.push(<StarFilledIcon key={`sf-${i}`} />);
  }
  if (hasHalf && stars.length < 5) {
    stars.push(<StarHalfFilledIcon key="sh" />);
  }
  return stars;
}
