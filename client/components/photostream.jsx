import React from 'react';
import Loader from './loader';

export default class Photostream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: true,
      modalImg: null
    };
    this.imgModal = this.imgModal.bind(this);
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

  render() {
    if (!this.props.images) return;

    const showLoader = this.state.loading ? '' : 'd-none';
    const hidden = this.state.modalVisible ? '' : 'd-none';
    const src = this.state.modalVisible ? this.state.modalImg.src : '';
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
      if (counter === this.props.images.length) {
        this.toggleLoad();
      }
    };

    const imageList = this.props.images.map(img => {
      const { imageUrl, photoId } = img.image;
      return { imageUrl, photoId };
    });

    const images = imageList.map(img => {
      const { imageUrl, photoId } = img;
      return (
            <img onLoad={onImgLoad} onClick={this.imgModal} key={photoId} src={imageUrl} id={photoId} alt='surfing' />
      );
    });

    return (
      <>
        <Loader show={showLoader} container="loading-container-center" />
        <div id="img-expand" className={hidden}>
          <div className='img-modal-overlay'></div>
          <div className='d-flex img-expand-container center'>
            <button className='close-button' onClick={this.imgModal}><i id="close-modal" className="fa fa-window-close"></i></button>
            <img src={src} alt='surfing' className='img-expand' />
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
