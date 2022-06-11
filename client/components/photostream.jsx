import React from 'react';

export default class Photostream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalImg: null
    };
    this.imgModal = this.imgModal.bind(this);
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

  render() {
    if (!this.props.images) return null;

    const firstName = this.props.firstName;

    const hidden = this.state.modalVisible ? '' : 'd-none';
    const src = this.state.modalVisible ? this.state.modalImg.src : '';

    const onImgLoad = ({ target: img }) => {
      const { offsetHeight: height, offsetWidth: width } = img;
      if (width > height) {
        img.className = 'landscape';
      } else if (width < height) {
        img.className = 'portrait';
      } else {
        img.className = 'square';
      }
    };

    const imageList = this.props.images.map(img => {
      if (!img.image) {
        return null;
      } else {
        const { imageUrl, photoId } = img.image;
        return { imageUrl, photoId };
      }
    });

    const images = imageList.map(img => {
      if (!img) {
        return (<h5 key="no-photos">{firstName} has no photos yet!</h5>);
      } else {
        const { imageUrl, photoId } = img;
        return (
            <img onLoad={onImgLoad} onClick={this.imgModal} key={photoId} src={imageUrl} id={photoId} alt='surfing' />
        );
      }
    });

    return (
      <>
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
