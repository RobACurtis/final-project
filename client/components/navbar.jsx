import React from 'react';

export default function Navbar(props) {
  const hideLogInButton = props.isLoggedIn ? 'd-none' : '';
  const hideProfileIcon = !props.isLoggedIn ? 'd-none' : '';
  let hidden = '';
  let opacity = '';
  if (window.location.hash === '#sign-up' || window.location.hash === '#sign-in') {
    hidden = 'd-none';
  } else if (window.location.hash === '') {
    opacity = 'home-page-nav-opacity';
  }
  return (
  <nav id="nav" className={`navbar navbar-expand-lg bg-dark fixed-top ${opacity}`}>
    <div className="container-fluid">
      <a href="#"><img className="logo" src="/logo.svg" alt="surfer logo" /> </a>
        <div className='d-flex align-items-end explore-link'>
        <a href="#explore" className={`explore-link mx-4 mb-1 ${hidden}`}>Explore</a>
        <a href="#log-in" className={`explore-link mx-3 mt-2 icon ${hideProfileIcon}`}><i className="fa fa-user"></i></a>
        <a href="#log-in" className={`btn btn-light log-in ${hideLogInButton}`}>Log In</a>
      </div>
    </div>
  </nav>
  );
}
