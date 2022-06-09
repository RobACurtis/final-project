import React from 'react';

export default class ImageUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
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
        this.fileInputRef.current.value = null;
        this.props.update();
        this.props.toggle();
      })
      .catch(err => console.error('Error:', err));
  }

  render() {
    let hidden;
    if (this.props.display) {
      hidden = '';
    } else {
      hidden = 'd-none';
    }
    return (
    <div id="img-expand" className={hidden}>
        <div className='upload-img-modal-overlay'></div>
        <div className='upload-form-container'>
          <div className='upload-form'>
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
                  accept=".png, .jpg, .jpeg" />
                <button type="submit" className="btn upload-button">
                  Upload
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
    );
  }
}
