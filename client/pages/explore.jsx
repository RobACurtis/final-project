import React from 'react';
import ExploreNavbar from '../components/explore-navbar';
import ExploreComponents from '../components/explore-components';

export default class Explore extends React.Component {
  render() {
    return (
    <>
      <ExploreNavbar active={this.props.active}/>
      <ExploreComponents active={this.props.active} />
    </>
    );
  }
}
