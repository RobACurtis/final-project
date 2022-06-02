import React from 'react';
import Navbar from '../components/navbar';
import ExploreNavbar from '../components/navbarLight';
import ExploreComponents from '../components/explore-components';

export default class Explore extends React.Component {
  render() {
    return (
    <>
      <Navbar />
      <ExploreNavbar active={this.props.active}/>
      <ExploreComponents active={this.props.active} />
    </>
    );
  }
}
