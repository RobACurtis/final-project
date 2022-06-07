import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import AppContext from '../lib/app-context';

export default class AuthPageComponents extends React.Component {

  render() {
    const path = this.context.route.path;
    if (path === 'sign-in') {
      return (
      <SignIn />
      );
    } else if (path === 'sign-up') {
      return (
        <SignUp />
      );
    }
  }
}

AuthPageComponents.contextType = AppContext;
