import React from 'react';

export default class LogIn extends React.Component {
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
            <h5 className='header-form'>Log In</h5>
            <div className="form-group">
              <input id="username" type="username" required className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id='password' type="password" required className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn signup-btn">Sign Up</button>
          </form>
        </div>
      </>
    );
  }
}
