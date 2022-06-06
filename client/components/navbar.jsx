import React from 'react';

export default function Navbar(props) {
  const user = props.isLoggedIn ? props.isLoggedIn : '';
  const hideLogInButton = props.isLoggedIn ? 'd-none' : '';
  const hideProfileIcon = !props.isLoggedIn ? 'd-none' : '';
  const homeNavOpacity = window.location.hash === '' ? 'home-page-nav-opacity' : '';
  let hideExploreNavigation = '';
  if (window.location.hash === '#sign-up' || window.location.hash === '#sign-in') {
    hideExploreNavigation = 'd-none';
  }

  return (
  <nav id="nav" className={`navbar navbar-expand-lg bg-dark fixed-top ${homeNavOpacity}`}>
    <div className="container-fluid">
      <a href="#"><img className="logo" src="/logo.svg" alt="surfer logo" /> </a>
        <div className='d-flex align-items-end explore-link'>
        <a href="#explore" className={`explore-link mx-4 mb-1 ${hideExploreNavigation}`}>Explore</a>
        <a href={`#photographer-profile?userId=${user.userId}`} className={`explore-link mx-3 mt-2 icon ${hideProfileIcon}`}>
          <i className="fa fa-user"></i>
        </a>
        <a href="#sign-in" className={`btn btn-light log-in-btn ${hideLogInButton}`}>Log In</a>
      </div>
    </div>
  </nav>
  );
}
