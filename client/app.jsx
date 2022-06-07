import React from 'react';
import AppContext from './lib/app-context';
import Home from './pages/home';
import jwtDecode from 'jwt-decode';
import Explore from './pages/explore';
import parseRoute from './lib/parse-route';
import ProfilePage from './pages/profilePage';
import Navbar from './components/navbar';
import AuthPage from './pages/authpage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null
    };
    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
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
      return <AuthPage />;
    } else if (route.path === 'sign-in') {
      return <AuthPage />;
    }
  }

  render() {
    const { handleSignIn } = this;
    const { route, user } = this.state;
    const contextValue = { handleSignIn, route, user };
    return (
    <>
    <AppContext.Provider value = {contextValue}>
      <Navbar />
      { this.renderPage() }
    </AppContext.Provider>
    </>
    );
  }
}

const homePageImages = ['/images/example3.jpg', '/images/example5.jpg', '/images/example9.jpg', '/images/example7.jpg'];
