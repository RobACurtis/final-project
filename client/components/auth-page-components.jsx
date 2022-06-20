import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import AppContext from '../lib/app-context';

export default class AuthPageComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'JJPhoto'
    };
    this.username = this.username.bind(this);
  }

  username(user) {
    this.setState({
      username: user
    });
  }

  render() {
    const path = this.context.route.path;
    if (path === 'sign-in') {
      return (
      <SignIn username={this.state.username} />
      );
    } else if (path === 'sign-up') {
      return (
        <SignUp newUser={this.username}/>
      );
    }
  }
}

AuthPageComponents.contextType = AppContext;
