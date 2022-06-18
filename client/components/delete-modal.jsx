import React from 'react';
import Loader from './loader';

export default class DeleteModal extends React.Component {
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
    const req = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': token
      }
    };
    fetch(`/api/auth/delete-image/${this.props.img.id}`, req)
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          window.location.hash = '#error';
          return;
        }
        this.props.toggle();
        this.props.update();
        this.setState({ loading: false });
      })
      .catch(err => {
        console.error('Error:', err);
        window.hash = '#error';
      });
  }

  render() {
    const showLoader = this.state.loading ? '' : 'd-none';
    const hidden = this.props.display ? 'd-none' : '';

    return (
      <>
      <Loader show={showLoader} container="loading-container-center loading-container-upload" />
      <div id="img-expand" className={hidden}>
        <div className='delete-modal-overlay'></div>
        <div className='delete-container'>
          <div className='delete-form'>
            <button className='delete-close' onClick={this.props.toggle}>
              <i id="close-modal" className="fa fa-window-close text-black"></i>
            </button>
            <h3>Delete Photo?</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-secondary" onClick={this.props.toggle}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger">
                  Delete
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
