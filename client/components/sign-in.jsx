import React from 'react';
import AppContext from '../lib/app-context';
import Loader from './loader';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidSignIn: false,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.state.invalidSignIn) this.setState({ invalidSignIn: false });
    if (event.target.id === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
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
      .then(res => {
        if (res.status === 401) {
          return res.status;
        } else {
          return res.json();
        }
      })
      .then(response => {
        if (response === 401) {
          this.setState({
            username: '',
            password: '',
            invalidSignIn: true,
            loading: false
          });
        } else if (response.error) {
          window.location.hash = '#error';
        } else {
          this.context.handleSignIn(response);
          window.location.hash = '#';
        }
      })
      .catch(err => {
        console.error('Error:', err);
        window.location.hash = '#error';
      });
  }

  render() {
    const showLoader = this.state.loading ? '' : 'd-none';
    const invalidSignIn = this.state.invalidSignIn ? 'invalid' : '';
    const invalidSignInText = this.state.invalidSignIn ? 'invalid-text' : 'd-none';
    return (
      <>
        <Loader show={showLoader} container="loading-container-top" />
        <div className='form-container'>
          <form action="#explore" className='signup-form center' onSubmit={this.handleSubmit}>
            <div className='circles-row'>
              <div className='blue-circle circle'></div>
              <div className='green-circle circle'></div>
            </div>
            <h5 className='header-form'>Log in to Surfr</h5>
            <div className="form-group">
              <input id="username" type="username" required className={`form-control ${invalidSignIn}`} placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id='password' type="password" required className={`form-control ${invalidSignIn}`} placeholder="Password" value={this.state.password} onChange={this.handleChange} />
              <p className={`${invalidSignInText}`}>Invalid username or password</p>
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
