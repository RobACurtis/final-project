import React from 'react';
import AuthPageComponents from '../components/auth-page-components';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {
    return (
      <>
        <div id="home-page">
          <div className="hero-image" >
            <div className='background-form"'></div>
            <img src='/images/gallery-images/example9.jpg' alt='surfing' className='sign-up-image' />
          </div>
        </div>
        <AuthPageComponents />
      </>
    );
  }
}

AuthPage.contextType = AppContext;
