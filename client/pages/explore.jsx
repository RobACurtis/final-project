import React from 'react';
import Navbar from '../components/navbar';
import NavbarLight from '../components/navbarLight';
import ExploreComponents from '../components/explore-components';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explore: 'photostream'
    };
  }

  componentDidMount() {
    if (this.props.active === 'people') {
      this.setState({ explore: 'people' });
    } else if (this.props.active === 'photostream') {
      this.setState({ explore: 'photostream' });
    }
  }

  render() {
    return (
    <>
      <Navbar />
      <NavbarLight active={this.props.active}/>
      <ExploreComponents active={this.props.active} />
    </>
    );
  }
}
