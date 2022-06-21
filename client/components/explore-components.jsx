import React from 'react';
import People from './user-cards';
import InfinitePhotostream from './infinite-photostream';

export default function ExploreComponent(props) {
  if (props.active === 'people') {
    return <People />;
  } else if (props.active === 'photostream') {
    return <InfinitePhotostream />;
  }
}
