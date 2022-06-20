import React from 'react';

export default class ErrorPage extends React.Component {
  render() {
    const subtitle = this.props.subtitle ? this.props.subtitle : 'An unexpected error occured!';
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
              <h3 className="error-subtitle mt-4 ">{subtitle}</h3>
              <div>
                <a href='#' className="mt-5 btn btn-light explore-button">Home</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
