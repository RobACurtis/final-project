import React from 'react';
import DeleteModal from './delete-modal';
import Loader from './loader';

export default class UserPhotostream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalImg: null,
      deleteModalVisible: false,
      loading: true
    };
    this.imgModal = this.imgModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    this.toggleLoad = this.toggleLoad.bind(this);
  }

  imgModal(event) {
    if (!this.state.modalVisible) {
      this.setState({
        modalVisible: true,
        modalImg: {
          src: event.target.src,
          id: event.target.id
        }
      });
    } else {
      this.setState({
        modalVisible: false,
        modalImg: null
      });
    }
  }

  toggleLoad() {
    this.setState({ loading: !this.state.loading });
  }

  toggleDeleteModal(event) {
    this.setState({ deleteModalVisible: !this.state.deleteModalVisible });
  }

  updateComponent() {
    this.props.update();
    this.setState({
      modalVisible: false,
      src: null
    });
  }

  render() {
    if (!this.props.images || !this.props.images[0]) return;

    const showLoader = this.state.loading ? '' : 'd-none';
    const hidden = this.state.modalVisible ? '' : 'd-none';
    const src = this.state.modalVisible ? this.state.modalImg.src : '';
    const id = this.state.modalVisible ? this.state.modalImg.id : '';
    let counter = 0;

    const onImgLoad = ({ target: img }) => {
      const { offsetHeight: height, offsetWidth: width } = img;
      if (width > height) {
        img.className = 'landscape';
      } else if (width < height) {
        img.className = 'portrait';
      } else {
        img.className = 'square';
      }
      counter++;
      if (counter === this.props.images.length && this.state.loading === true) {
        this.toggleLoad();
      }
    };

    const images = this.props.images.map(img => {
      const { imageUrl, photoId } = img;
      return (
             <img onLoad={onImgLoad} onClick={this.imgModal} key={photoId} src={imageUrl} id={photoId} alt='surfing' />
      );
    });

    return (
      <>
        <Loader show={showLoader} container="loading-container-center" />
        <DeleteModal img={this.state.modalImg} display={!this.state.deleteModalVisible} toggle={this.toggleDeleteModal} update={this.updateComponent}/>
        <div id="img-expand" className={hidden}>
          <div className='img-modal-overlay'></div>
          <div className='d-flex img-expand-container center'>
            <button className='close-button' onClick={this.imgModal}><i id="close-modal" className="fa fa-window-close"></i></button>
            <img src={src} id={id} alt='surfing' className='img-expand' />
            <button className='trash-button' onClick={this.toggleDeleteModal}><i className="fa fa-trash"></i></button>
          </div>
        </div>
        <div className="gallery-container">
          <div id="gallery" className="img-gallery">
            {images}
          </div>
        </div>
      </>
    );
  }
}
