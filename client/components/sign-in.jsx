import React from 'react';
import AppContext from '../lib/app-context';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
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
        username: this.state.username,
        password: this.state.password

      })
    };

    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(response => {
        this.context.handleSignIn(response);
        window.location.hash = '#';
      })
      .catch(err => console.error('Error:', err));

  }

  render() {
    return (
      <>
        <div className='form-container'>
          <form action="#explore" className='signup-form center' onSubmit={this.handleSubmit}>
            <div className='circles'>
              <div className='blue-circle circle'></div>
              <div className='green-circle circle'></div>
            </div>
            <h5 className='header-form'>Log in to Surfr</h5>
            <div className="form-group">
              <input id="username" type="username" required className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id='password' type="password" required className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn signup-btn">Log In</button>
            <p className='sign-up-text'>Not a Surfr member? <a href="#sign-up" className='sign-up-link'> Sign Up</a> </p>
          </form>
        </div>
      </>
    );
  }
}

SignIn.contextType = AppContext;
