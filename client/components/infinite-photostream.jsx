import React from 'react';

export default class InfinitePhotostream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      numberOfImages: 0,
      loading: true,
      modalVisible: false,
      modalImg: null
    };
    this.imgModal = this.imgModal.bind(this);
    this.lastImageRef = this.lastImageRef.bind(this);
    this.observer = React.createRef(this.lastImageRef);
    this.loadImages = this.loadImages.bind(this);
  }

  componentDidMount() {
    fetch('/api/explore-images/0')
      .then(res => res.json())
      .then(images => {
        this.setState({
          images,
          numberOfImages: 15,
          loading: true
        });
      });
  }

  lastImageRef(node) {
    if (this.observer.current) {
      this.observer.current.disconnect();
    }
    this.observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (this.state.loading) {
          return null;
        } else {
          this.loadImages();
        }
      }
    });

    if (node) {
      this.observer.current.observe(node);
    }

    this.setState({ loading: true });
  }

  load() {
    this.setState({ loading: false });
  }

  loadImages() {
    const numberOfImages = this.state.numberOfImages;
    fetch(`/api/explore-images/${numberOfImages}`)
      .then(res => res.json())
      .then(images => {
        if (!images[0]) {
          return null;
        } else if (images[0]) {
          const newNumber = numberOfImages + 15;
          const currentImages = this.state.images;
          for (let i = 0; i < images.length; i++) {
            currentImages.push(images[i]);
          }
          this.setState({ images: currentImages, numberOfImages: newNumber, loading: true });
        }
      });
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
    if (!this.state.images) return null;

    const hidden = this.state.modalVisible ? '' : 'd-none';
    const src = this.state.modalVisible ? this.state.modalImg.src : '';
    const onImgLoad = ({ target: img }) => {
      const { offsetHeight: height, offsetWidth: width } = img;
      if (width > height) {
        img.className = ' landscape';
      } else if (width < height) {
        img.className = ' portrait';
      } else {
        img.className = ' square';
      }
    };

    const onLastImgLoad = ({ target: img }) => {
      const { offsetHeight: height, offsetWidth: width } = img;
      if (width > height) {
        img.className = ' landscape';
      } else if (width < height) {
        img.className = ' portrait';
      } else {
        img.className = ' square';
      }
      this.load();
    };

    const imageList = this.state.images;

    const images = imageList.map((img, index) => {
      if (!img) {
        return (<h5 key="no-photos"> Sorry, no photos!</h5>);
      } else {
        const { imageUrl, photoId } = img;
        if (index === imageList.length - 5) {
          return <img onLoad={onLastImgLoad} ref={this.lastImageRef} onClick={this.imgModal} key={photoId} src={imageUrl} id={photoId} alt='surfing' />;
        }
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
