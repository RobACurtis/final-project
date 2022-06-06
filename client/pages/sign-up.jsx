import React from 'react';
import Navbar from '../components/navbar';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      location: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'firstName') {
      this.setState({ firstName: event.target.value });
    } else if (event.target.id === 'lastName') {
      this.setState({ lastName: event.target.value });
    } else if (event.target.id === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    } else if (event.target.id === 'location') {
      this.setState({ location: event.target.value });
    } else if (event.target.id === 'email') {
      this.setState({ email: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        location: this.state.location,
        email: this.state.email
      })
    };

    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(response => {
        window.location.hash = '#';
      })
      .catch(err => console.error('Error:', err));
  }

  render() {
    return (
      <>
      <Navbar hidden="d-none" />
      <div id="home-page">
        <div className="hero-image" >
          <div className='background-form"'></div>
          <img src='/images/example9.jpg' alt='surfing' className='sign-up-image' />
        </div>
      </div>
      <div className='form-container'>
          <form action="#explore" className='signup-form center' onSubmit={this.handleSubmit}>
            <div className='circles'>
              <div className='blue-circle circle'></div>
              <div className='green-circle circle'></div>
            </div>
            <h5 className='header-form'>Sign up for Surfr</h5>
            <div className="form-group">
              <input id="firstName" type="first-name" required className="form-control" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id="lastName" type="last-name" required className="form-control" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id="username" type="username" required className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id='password' type="password" required className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id='location' type="location" required className="form-control" placeholder="Location" value={this.state.location} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id='email' type="email" required className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn signup-btn">Sign Up</button>
          </form>
      </div>
      </>
    );
  }
}
