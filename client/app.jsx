import React from 'react';
import Home from './pages/home';

export default class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return <Home list={homePageImages}/>;
  }
}

const homePageImages = ['/images/example1.jpg', '/images/example2.jpg', '/images/example3.jpg', '/images/example7.jpg'];
