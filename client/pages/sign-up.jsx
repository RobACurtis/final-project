import React from 'react';

export default class SignUp extends React.Component {

  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg bg-dark py-3 fixed-top">
        <div className="container-fluid">
          <a href="#"><img className="logo" src="/logo.svg" alt="surfer logo" /> </a>
        </div>
      </nav>
      <div id="home-page">
        <div className="hero-image">
          <img src='/images/example7.jpg' alt='surfing' className='sign-up-image' />
        </div>
      </div>
      <div className='form-container'>
          <form className='signup-form center'>
            <div className='circles'>
              <div className='blue-circle circle'></div>
              <div className='green-circle circle'></div>
            </div>
            <h5 className='header-form'>Sign up for Surfr</h5>
            <div className="form-group">
              <input type="first-name" className="form-control" placeholder="First Name" />
            </div>
            <div className="form-group">
              <input type="last-name" className="form-control" placeholder="Last Name" />
            </div>
            <div className="form-group">
              <input type="username" className="form-control" placeholder="Username" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="location" className="form-control" placeholder="Location" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <button type="submit" className="btn signup-btn">Sign Up</button>
          </form>
      </div>
      </>
    );
  }
}
