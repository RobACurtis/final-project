import React from 'react';
import UserPhotostream from '../components/user-photostream';
import AppContext from '../lib/app-context';
import ImageUploadModal from '../components/image-upload';
import GalleryImageUploadModal from '../components/gallery-upload';

export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      images: [],
      profileImageModalVisible: false,
      uploadGalleryImageModal: false
    };
    this.toggleProfileImageModal = this.toggleProfileImageModal.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.toggleUploadGalleryImageModal = this.toggleUploadGalleryImageModal.bind(this);
  }

  toggleProfileImageModal(e) {
    this.setState({
      profileImageModalVisible: !this.state.profileImageModalVisible
    });
  }

  toggleUploadGalleryImageModal(e) {
    this.setState({
      uploadGalleryImageModal: !this.state.uploadGalleryImageModal
    });
  }

  updateProfile() {
    const userId = this.context.user.userId;
    fetch(`/api/photographer-profile/${userId}`)
      .then(res => res.json())
      .then(user => {
        const { firstName, lastName, email, location, coverImageUrl, profileImageUrl, photos } = user[0];
        const images = photos.map(image => {
          if (!image) {
            return null;
          }
          const { imageUrl, photoId } = image;
          return { imageUrl, photoId };
        });

        this.setState({
          user: {
            firstName,
            lastName,
            email,
            location,
            coverImageUrl,
            profileImageUrl,
            userId
          },
          images
        });
      });
  }

  componentDidMount() {
    this.updateProfile();
  }

  render() {
    if (!this.state.user) return null;
    const images = this.state.images[0] ? this.state.images : null;
    const { firstName, lastName, email, location, coverImageUrl, profileImageUrl } = this.state.user;
    const footerText = images ? 'You\'ve seen all of your photos!' : `${firstName}, you've got no photos!`;
    const emailHref = `mailto:${email}`;
    return (
      <>
      <ImageUploadModal toggle={this.toggleProfileImageModal} update={this.updateProfile} display={this.state.profileImageModalVisible}/>
      <GalleryImageUploadModal toggle={this.toggleUploadGalleryImageModal} update={this.updateProfile} display={this.state.uploadGalleryImageModal}/>
        <div className="profile-container">
          <div className="overlay-coverphoto"></div>
          <div className="coverphoto-container">
            <img src={coverImageUrl} className="coverphoto" alt="shorebreak" />
          </div>
          <div className="profile-info">
            <div>
              <img src={profileImageUrl} className="profile-image" alt="profile picture" />
              <button type="button" className='edit-profile-image' onClick={this.toggleProfileImageModal}>
                  <i className="fa-solid fa-pen edit-profile-image-icon"></i>
                </button>
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
          <button className='upload-images-button' onClick={this.toggleUploadGalleryImageModal}><i className="fa-solid fa-images"></i> <span className='upload-text'>Upload Images</span></button>
        </nav>
        <UserPhotostream images={images} update={this.updateProfile}/>
        <div>
          <div className='d-flex center'>
            <div className='blue-circle circle'></div>
            <div className='green-circle circle'></div>
          </div>
          <p className='mt-3 mb-5 center footer-text'>{footerText}</p>
        </div>
      </>
    );
  }
}

UserProfilePage.contextType = AppContext;
