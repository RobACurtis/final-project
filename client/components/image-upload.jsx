import React from 'react';
import Loader from './loader';

export default class ImageUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    const req = {
      method: 'POST',
      headers: {
        'X-Access-Token': token
      },
      body: formData
    };
    fetch('/api/auth/profile-image', req)
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          window.location.hash = '#error';
          return;
        }
        this.fileInputRef.current.value = null;
        this.props.update();
        this.props.toggle();
        this.setState({ loading: false });
      })
      .catch(err => console.error('Error:', err));
  }

  render() {
    const showLoader = this.state.loading ? '' : 'd-none';
    const hidden = this.props.display ? '' : 'd-none';
    return (
      <>
    <Loader show={showLoader} container="loading-container-center loading-container-upload" />
    <div id="img-expand" className={hidden}>
        <div className='upload-img-modal-overlay'></div>
          <div className='upload-form-container'>
            <div className='upload-form-row'>
              <button className='upload-close' onClick={this.props.toggle}>
                <i id="close-modal" className="fa fa-window-close text-black"></i>
              </button>
              <h3>Edit Profile Photo</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    required
                    type="file"
                    name="image"
                    ref={this.fileInputRef}
                    className='form-control'
                    accept=".png, .jpg, .jpeg" />
                  <button type="submit" className="btn upload-button">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
       </div>
      </>
    );
  }
}
