import React from 'react';
import Photostream from '../components/photostream';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      images: []
    };
  }

  componentDidMount() {
    fetch('/api/photographer-profile/' + this.props.userId)
      .then(res => res.json())
      .then(user => {
        const { firstName, lastName, email, location, coverImageUrl, profileImageUrl, photos } = user[0];
        const images = photos.map(image => {
          return { image };
        });

        this.setState({
          user: {
            firstName,
            lastName,
            email,
            location,
            coverImageUrl,
            profileImageUrl
          },
          images
        });
      });
  }

  render() {
    if (!this.state.user) return null;
    const images = this.state.images;
    const { firstName, lastName, email, location, coverImageUrl, profileImageUrl } = this.state.user;
    const emailHref = `mailto:${email}`;

    return (
    <>
      <div className="profile-container">
        <div className="overlay-coverphoto"></div>
        <div className="coverphoto-container">
          <img src={coverImageUrl} className="coverphoto" alt="shorebreak" />
        </div>
      <div className="profile-info">
          <div>
            <img src={profileImageUrl} className="profile-image" alt="profile picture" />
          </div>
          <div className="text-white">
            <h1 className="profile-name">{`${firstName} ${lastName}`}</h1>
            <p className='profile-subtext' >{location}</p>
          <a target="_blank" rel="noopener noreferrer" href={emailHref} className='profile-subtext email'>
            {email}
            </a>
          </div>
        </div>
      </div>
    <nav className="navbar bg-light py-3 shadow-sm profile-navbar-light position-sticky">
      <ul className="navbar-list">
        <li className="nav-item light-nav-list-item active-nav">
          <p id='photostream'> Photostream</p>
        </li>
      </ul>
    </nav>
    <Photostream images={images} firstName={this.state.user.firstName}/>
    </>
    );
  }
}
