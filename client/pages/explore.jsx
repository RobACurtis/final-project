import React from 'react';
import Navbar from '../components/navbar';
import NavbarLight from '../components/navbarLight';
import Photostream from '../components/photostream';
import People from '../components/people';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explore: 'photostream'
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    console.log(e.target.id);
    if (event.target.id === 'photostream') {
      this.setState({explore: 'photostream'})
    } else if (e.target.id === 'people') {
      this.setState({explore: 'people'})
    }
  }

  render() {
    const active = this.state.explore;
    if (active === 'photostream') {
      return (
        <>
          <Navbar />
          <nav id="navbar-light" className="navbar bg-light py-3 shadow-sm fixed-top">
            <ul className="navbar-list">
            <li className="nav-item photostream active-nav">
                <a onClick={this.toggle}><p id='photostream'> Photostream</p></a>
            </li>
            <li className="nav-item active photostream">
                <a onClick={this.toggle}><p id='people'> People</p></a>
            </li>
            </ul>
          </nav>
          <Photostream />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <nav id="navbar-light" className="navbar bg-light py-3 shadow-sm fixed-top">
            <ul className="navbar-list">
              <li className="nav-item photostream">
                <a onClick={this.toggle}><p id='photostream'> Photostream</p></a>
              </li>
              <li className="nav-item active photostream active-nav">
                <a onClick={this.toggle}><p id='people'> People</p></a>
              </li>
            </ul>
          </nav>
          <People />
        </>
      );
    }
  }
}
