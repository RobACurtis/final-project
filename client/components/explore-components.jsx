import React from 'react';
import People from './people';
import Photostream from './photostream';

export default function ExploreComponent(props) {
  if (props.active === 'people') {
    return <People />;
  } else if (props.active === 'photostream') {
    return <Photostream />;
  }
}
