import React from 'react';

export default function NavbarLight(props) {
  console.log(props);
  let photostream = '';
  let people = '';
  if (props.active === 'photostream') {
    photostream = 'active';
  } else if (props.active === 'people') {
    people = 'active';
  }
  return (
    <nav id="navbar-light" class="navbar navbar-expand-lg bg-light py-3 shadow-sm">
      <div className={`photostream-div d-flex ${photostream}`}>
        <a onClick={this.toggle}><p id='photostream'> Photostream</p></a>
      </div>
      <div className={`photostream-div d-flex ${people}`}>
        <a onClick={this.toggle}><p id='people'> People</p></a>
      </div>
    </nav>
  );
}
