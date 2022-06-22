import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(event) {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    const { user, route } = this.context;
    const showMenu = this.state.showMenu ? '' : 'd-none';
    const hideLogInButton = user ? 'd-none' : '';
    const hideProfileIcon = !user ? 'd-none' : '';
    const navOpacity = route.path === '' ? 'nav-opacity' : '';
    let hideExploreNavigation = '';
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      hideExploreNavigation = 'd-none';
    }

    return (
  <nav id="nav" className={`navbar navbar-expand-lg bg-dark fixed-top ${navOpacity}`}>
    <div className="container-fluid">
      <a href="#"><img className="logo" src="/logo.svg" alt="surfer logo" /> </a>
        <div className='d-flex align-items-end margin-ten-percent'>
        <a href="#explore" className={`explore-link mx-4 mb-1 ${hideExploreNavigation}`}>Explore</a>
          <div onClick={this.showMenu} className={`explore-link mx-3 mt-2 icon ${hideProfileIcon}`}>
            <button className='icon-button text-light'><i className="fa fa-user"></i></button>
            <div className={`d-flex flex-column center position-absolute menu-items bg-light text-dark ${showMenu}`}>
              <a href="#user-profile" className='item mt-2'>View Profile</a>
              <button onClick={this.context.handleSignOut} className='log-out item'>Log Out</button>
            </div>
          </div>
        <a href="#sign-up" className={`btn btn-light log-in-btn ${hideLogInButton}`}>Sign Up </a>
      </div>
    </div>
  </nav>
    );
  }
}

Navbar.contextType = AppContext;
