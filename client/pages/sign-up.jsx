import React from 'react';

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
    if (event.target.id ==='firstName') {
    this.setState({ firstName: event.target.value });
    } else if (event.target.id ==='lastName') {
      this.setState({ lastName: event.target.value });
    } else if (event.target.id ==='username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id ==='password') {
      this.setState({ password: event.target.value });
    } else if (event.target.id ==='location') {
      this.setState({ location: event.target.value });
    } else if (event.target.id ==='email') {
      this.setState({ email: event.target.value });
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    console.log('1',formData);
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('location', this.state.location);
    formData.append('email', this.state.email);
    console.log(formData);
    const formDataString = JSON.stringify(formData);
    console.log(formDataString);
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
      })
    };
    // const req = {
    //   method: 'POST',
    //   body: formDataString
    // };

    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(response => {
        console.log('response body', response);
        this.setState({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          location: '',
          email: ''
        });
      })
      .catch(err => console.error('Error:', err));
    }

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
          <form className='signup-form center' onSubmit={this.handleSubmit}>
            <div className='circles'>
              <div className='blue-circle circle'></div>
              <div className='green-circle circle'></div>
            </div>
            <h5 className='header-form'>Sign up for Surfr</h5>
            <div className="form-group">
              <input id="firstName" type="first-name" className="form-control" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input id="lastName" type="last-name" className="form-control" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input id="username" type="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange}  />
            </div>
            <div className="form-group">
              <input id='password' type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange}  />
            </div>
            <div className="form-group">
              <input id='location' type="location" className="form-control" placeholder="Location" value={this.state.location} onChange={this.handleChange}  />
            </div>
            <div className="form-group">
              <input id='email' type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange}  />
            </div>
            <button type="submit" className="btn signup-btn">Sign Up</button>
          </form>
      </div>
      </>
    );
  }
}
