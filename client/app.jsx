import React from 'react';
import Home from './pages/home';
import Explore from './pages/explore';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home list={homePageImages} />;
    }
    if (route.path === 'explore') {
      return <Explore />;
    }
  }

  render() {
    return (
    <>
      { this.renderPage() }
    </>
    );
  }
}

const homePageImages = ['/images/example3.jpg', '/images/example5.jpg', '/images/example9.jpg', '/images/example7.jpg'];
