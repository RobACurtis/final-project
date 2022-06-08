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
        console.log('response body', response);
        this.fileInputRef.current.value = null;
        this.props.update();
        this.props.toggle();
      })
      .catch(err => console.error('Error:', err));
    }

  render () {
    console.log(this.props)
    let hidden;
    if (this.props.display) {
      hidden = '';
    } else {
      hidden = 'd-none';
    }
    return (
    <div id="img-expand" className={hidden}>
          <div className='upload-img-modal-overlay'></div>
        <div className='d-flex form-container center'>
          <button className='close-button-upload' onClick={this.props.toggle}>
            <i id="close-modal" className="fa fa-window-close"></i>
          </button>
          <div className='upload-form'>
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex justify-content-between align-items-center">
                <input
                  required
                  type="file"
                  name="image"
                  ref={this.fileInputRef}
                  accept=".png, .jpg, .jpeg, .gif" />
                <button type="submit" className="btn btn-primary">
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
