import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {

  render() {
    const { user, route } = this.context;
    const userId = user ? user.userId : '';
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
        <div className='d-flex align-items-end explore-link'>
        <a href="#explore" className={`explore-link mx-4 mb-1 ${hideExploreNavigation}`}>Explore</a>
            <a href={`#user-profile`} className={`explore-link mx-3 mt-2 icon ${hideProfileIcon}`}>
          <i className="fa fa-user"></i>
        </a>
        <a href="#sign-in" className={`btn btn-light log-in-btn ${hideLogInButton}`}>Log In </a>
      </div>
    </div>
  </nav>
    );
  }
}

Navbar.contextType = AppContext;
