import React from 'react';

export default function NavbarLight(props) {
  // console.log(props);
  let photostream = '';
  let people = '';
  if (props.active === 'photostream') {
    photostream = 'active-nav';
  } else if (props.active === 'people') {
    people = 'active-nav';
  }
  return (
  <nav id="navbar-light" className="navbar bg-light py-3 shadow-sm fixed-top">
    <ul className="navbar-list">
    <li className={`nav-item photostream ${photostream}`}>
        <a href='#explore'><p id='photostream'> Photostream</p></a>
    </li>
    <li className={`nav-item active photostream ${people}`}>
        <a href='#explore-people'><p id='people'> People</p></a>
      </li>
      </ul>
  </nav>
  );
}
