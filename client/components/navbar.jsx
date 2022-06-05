import React from 'react';

export default function Navbar(props) {
  return (
  <nav id="nav" className={`navbar navbar-expand-lg bg-dark py-3 fixed-top ${props.opacity}`}>
    <div className="container-fluid">
      <a href="#"><img className="logo" src="/logo.svg" alt="surfer logo" /> </a>
        <a href="#explore" className="explore-link">Explore</a>
    </div>
  </nav>
  );
}
