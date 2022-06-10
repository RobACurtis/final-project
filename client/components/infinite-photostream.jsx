import React from 'react';

export default class InfinitePhotostream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      modalVisible: false,
      modalImg: null
    };
    this.imgModal = this.imgModal.bind(this);
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  componentDidMount() {
    fetch('/api/explore-images/0')
      .then(res => res.json())
      .then(images => {
        this.setState({ images });
      });
    window.addEventListener('scroll', this.infiniteScroll);
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

  infiniteScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
      window.removeEventListener('scroll', this.infiniteScroll);
      if (!this.state.images) {
        return null;
      }
      const numberOfImagesLoaded = this.state.images.length;
      fetch(`/api/explore-images/${numberOfImagesLoaded}`)
        .then(res => res.json())
        .then(images => {
          if (!images[0]) {
            return null;
          } else if (images[0]) {
            const currentImages = this.state.images;
            for (let i = 0; i < images.length; i++) {
              currentImages.push(images[i]);
            }
            this.setState({ images: currentImages });
          }
        });
      setTimeout(() => {
        window.addEventListener('scroll', this.infiniteScroll);
      }, 1000);
    }
  }

  render() {
    if (!this.state.images) return null;

    const hidden = this.state.modalVisible ? '' : 'd-none';
    const src = this.state.modalVisible ? this.state.modalImg.src : '';
    const onImgLoad = ({ target: img }) => {
      const { offsetHeight: height, offsetWidth: width } = img;
      if (width > height) {
        img.className += ' landscape';
      } else if (width < height) {
        img.className += ' portrait';
      } else {
        img.className += ' square';
      }
    };

    const imageList = this.state.images
      ? this.state.images
      : this.props.images.map(img => {
        if (!img.image) {
          return null;
        } else {
          const { imageUrl, photoId } = img.image;
          return { imageUrl, photoId };
        }
      });

    const images = imageList.map(img => {
      if (!img) {
        return (<h5 key="no-photos"> Sorry, no photos!</h5>);
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
