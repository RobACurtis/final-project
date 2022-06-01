import React from 'react';
import Navbar from '../components/navbar';
import NavbarLight from '../components/navbarLight';
import Photostream from '../components/photostream';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explore: 'photostream'
    };
  }

  render() {
    const content = this.state.explore;
    if (content === 'photostream') {
      return (
        <>
          <Navbar />
          <NavbarLight />
          <Photostream />
        </>
      );
    } else {
      return (
        <Navbar />
      );
    }
  }
}
