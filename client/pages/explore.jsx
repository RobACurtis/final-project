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
          <nav id="navbar-light" className="navbar navbar-expand-lg bg-light py-3 shadow-sm">
            <div className="photostream-div d-flex active">
              <a onClick={this.toggle}><p id='photostream'> Photostream</p></a>
            </div>
            <div className="photostream-div d-flex">
              <a onClick={this.toggle}><p id='people'> People</p></a>
            </div>
          </nav>
          <Photostream />
        </>
      );
    } else {
      return (
        <>
         <Navbar />
         <nav id="navbar-light" className="navbar navbar-expand-lg bg-light py-3 shadow-sm">
            <div className="photostream-div d-flex">
              <a onClick={this.toggle}><p id='photostream'> Photostream</p></a>
            </div>
            <div className="photostream-div d-flex active">
              <a onClick={this.toggle}><p id='people'> People</p></a>
            </div>
          </nav>
          <People />
        </>
      );
    }
  }
}
