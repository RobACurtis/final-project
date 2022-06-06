import React from 'react';
import Home from './pages/home';
import Explore from './pages/explore';
import parseRoute from './lib/parse-route';
import ProfilePage from './pages/profilePage';
import SignUp from './pages/sign-up';
import Navbar from './components/navbar';
import LogIn from './/pages/log-in';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null
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
    } else if (route.path === 'explore') {
      return <Explore active='photostream' />;
    } else if (route.path === 'explore-people') {
      return <Explore active='people'/>;
    } else if (route.path === 'photographer-profile') {
      const userId = route.params.get('userId');
      return <ProfilePage userId={userId} />;
    } else if (route.path === 'sign-up') {
      return <SignUp />;
    } else if (route.path === 'log-in') {
      return <LogIn />;
    }
  }

  render() {
    return (
    <>
      <Navbar isLoggedIn={this.state.user} />
      { this.renderPage() }
    </>
    );
  }
}

const homePageImages = ['/images/example3.jpg', '/images/example5.jpg', '/images/example9.jpg', '/images/example7.jpg'];
