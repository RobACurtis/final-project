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
    const { user, route, profileImageUrl } = this.context;
    const profileImage = profileImageUrl || null;
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
        <div className='d-flex align-items-end nav-items'>
        <a href="#explore" className={`explore-link mx-4 mb-1 ${hideExploreNavigation}`}>Explore</a>
          <div onClick={this.showMenu} className={hideProfileIcon}>
            <button className='icon-button'><img src={profileImage} className='navbar-user-img'></img></button>
            <div className={`d-flex flex-column align-items-end position-absolute menu-items px-1 bg-light text-dark shadow ${showMenu}`}>
              <a href="#user-profile" className='item mt-2'>View Profile</a>
              <button onClick={this.context.handleSignOut} className='center log-out-button item'>Log Out</button>
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
