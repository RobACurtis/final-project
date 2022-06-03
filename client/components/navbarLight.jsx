import React from 'react';

export default function ExploreNavbar(props) {
  let photostreamActive = '';
  let peopleActive = '';
  if (props.active === 'photostream') {
    photostreamActive = 'active-nav';
  } else if (props.active === 'people') {
    peopleActive = 'active-nav';
  }
  return (
  <nav id="navbar-light" className="navbar bg-light py-3 shadow-sm position-sticky">
    <ul className="navbar-list">
      <li className={`nav-item light-nav-list-item ${photostreamActive}`}>
        <a href='#explore'><p id='photostream'> Photostream</p></a>
    </li>
      <li className={`nav-item light-nav-list-item ${peopleActive}`}>
        <a href='#explore-people'><p id='people'> People</p></a>
      </li>
      </ul>
  </nav>
  );
}
