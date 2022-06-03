import React from 'react';
import Navbar from '../components/navbar';
import Photostream from '../components/photostream';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      user: null,
      imageUrls: []
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
          return { imageUrl: imageUrl.imageUrl };
        });
        this.setState({
          user: { firstName, lastName, email, location, coverImageUrl, profileImageUrl },
          imageUrls
        });
      });
  }

  render() {
    if (!this.state.user) return null;
    const images = this.state.imageUrls;
    const { firstName, lastName, email, location, coverImageUrl, profileImageUrl } = this.state.user;
    const emailHref = `mailto:${email}`;

    return (
    <>
      <Navbar />
          <div className="profile-container">
            <div className="overlay-coverphoto"></div>
            <div className="coverphoto-container">
              <img src={coverImageUrl} className="coverphoto" alt="..." />
            </div>
            <div className="profile-info ">
              <div className="column-thirty">
                <img src={profileImageUrl} className="profile-image" alt="..." />
              </div>
              <div className="column-half user-info">
                <h5 className="profile-name">{`${firstName} ${lastName}`}</h5>
                <p className='profile-location' >{location}</p>
              <a target="_blank" rel="noopener noreferrer" href={emailHref} className='profile-email'> {email}</a>
              </div>
            </div>
          </div>
        <nav className="navbar bg-light py-3 shadow-sm profile-navbar-light">
          <ul className="navbar-list">
            <li className="nav-item light-nav-list-item active-nav">
              <p id='photostream'> Photostream</p>
            </li>
          </ul>
        </nav>
        <Photostream images={images}/>
    </>
    );
  }
}
