import React from 'react';

export default function NavbarLight(props) {
  return (
    <nav className={`navbar navbar-expand-lg bg-light py-3 light-nav ${props.opacity}`}>
      <div className="container-fluid">
        <a href="#"><p>Photostream</p></a>
      </div>
    </nav>
  );
}
