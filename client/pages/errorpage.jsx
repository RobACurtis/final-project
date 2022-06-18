import React from 'react';

export default class ErrorPage extends React.Component {
  render() {
    return (
      <>
        <div id="home-page">
          <div className="hero-image" >
            <div className='background-form"'></div>
            <img src='/images/surfr3.jpg' alt='surfing' className='sign-up-image' />
          </div>
        </div>
        <div id="explore" className="overlay-homepage center">
          <div id="explore-text" className="d-flex center">
            <div className="center">
              <h1 className="home-title">Oops!</h1>
              <h3 className="home-subtitle mt-4 ">An unexpected error occured!</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}
