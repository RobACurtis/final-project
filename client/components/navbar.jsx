import React from 'react';

export default function Navbar(props) {
  return (
  <nav className="navbar navbar-expand-lg bg-dark py-3 fixed-top opacity-75">
    <div className="container-fluid">
      <img className="logo" src="/logo.svg" alt="surfer logo" />
    </div>
  </nav>
  );
}
