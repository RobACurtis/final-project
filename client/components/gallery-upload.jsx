import React from 'react';

export default class GalleryImageUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < this.fileInputRef.current.files.length; i++) {
      formData.append('image', this.fileInputRef.current.files[i]);
    }
    const token = window.localStorage.getItem('react-context-jwt');

    const req = {
      method: 'POST',
      headers: {
        'X-Access-Token': token
      },
      body: formData
    };
    fetch('/api/auth/gallery-images', req)
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
            <h3>Upload Photos</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex justify-content-between align-items-center">
                <input
                  multiple
                  className='form-control'
                  id='formFileMultiple'
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
