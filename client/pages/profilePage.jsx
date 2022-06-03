import React from 'react';
import Navbar from '../components/navbar';
import Photostream from '../components/photostream';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      user: null,
      imageUrls: [],
    };
  }

  componentDidMount() {
    fetch('/api/photographer-profile/' + this.state.userId)
      .then(res => res.json())
      .then(user => {
        const firstName = user[0].firstName;
        const lastName = user[0].lastName;
        const email = user[0].email;
        const location = user[0].location;
        const coverImageUrl = user[0].coverImageUrl;
        const profileImageUrl = user[0].profileImageUrl;
        const imageUrls = user.map(imageUrl => {
          return {imageUrl: imageUrl.imageUrl};
        });
        this.setState({
          user: { firstName, lastName, email, location, coverImageUrl, profileImageUrl },
          imageUrls
        });
      });
  }

  render() {
    if (!this.state.user) return null;
    const firstName = this.state.user.firstName;
    const lastName = this.state.user.lastName;
    const email = this.state.user.email;
    const location = this.state.user.location;
    const coverPhoto = this.state.user.coverImageUrl;
    const profilePhoto = this.state.user.profileImageUrl;
    const images = this.state.imageUrls;
    return (
    <>
      <Navbar />
          <div className="profile-container">
            <div className="overlay-coverphoto"></div>
            <div className="coverphoto-container">
              <img src={coverPhoto} className="coverphoto" alt="..." />
            </div>
            <div className="row profile-info ">
              <div className="column-thirty">
                <img src={profilePhoto} className="profile-image" alt="..." />
              </div>
              <div className="column-half user-info">
                <h5 className="profile-name">{`${firstName} ${lastName}`}</h5>
                <p>{location}</p>
              </div>
            </div>
          </div>
        <nav className="navbar bg-light py-3 shadow-sm profile-navbar-light">
          <ul className="navbar-list">
            <li className={`nav-item light-nav-list-item active-nav`}>
              <p id='photostream'> Photostream</p>
            </li>
          </ul>
        </nav>
        <Photostream images={images}/>
    </>
    );
  }
}
