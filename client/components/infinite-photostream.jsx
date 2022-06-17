import React from 'react';
import Loader from './loader';

export default class InfinitePhotostream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      newImages: 0,
      loading: true,
      modalVisible: false,
      modalImg: null
    };
    this.imgModal = this.imgModal.bind(this);
    this.observerImage = this.observerImage.bind(this);
    this.observer = React.createRef();
    this.loadImages = this.loadImages.bind(this);
    this.toggleLoad = this.toggleLoad.bind(this);
  }

  componentDidMount() {
    fetch('/api/explore-images/0')
      .then(res => res.json())
      .then(images => {
        this.setState({
          images,
          newImages: images.length,
          loading: true
        });
      });
  }

  toggleLoad() {
    this.setState({ loading: false });
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

  observerImage(node) {
    this.observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (this.state.loading) {
          return null;
        } else {
          this.observer.current.unobserve(node);
          this.loadImages();
        }
      }
    }, { threshold: 1 });

    if (node) this.observer.current.observe(node);
  }

  loadImages() {
    fetch(`/api/explore-images/${this.state.images.length}`)
      .then(res => res.json())
      .then(images => {
        if (!images[0]) {
          return null;
        } else if (images[0]) {
          const currentImages = this.state.images;
          for (let i = 0; i < images.length; i++) {
            currentImages.push(images[i]);
          }
          const newImages = images.length;
          this.setState({ images: currentImages, newImages, loading: true });
        }
      });
  }

  componentWillUnmount() {
    if (this.observer.current) this.observer.current.disconnect();
  }

  render() {
    if (!this.state.images) return null;

    const showLoader = this.state.loading ? '' : 'd-none';
    const footer = this.state.loading ? 'd-none' : '';
    const hidden = this.state.modalVisible ? '' : 'd-none';
    const src = this.state.modalVisible ? this.state.modalImg.src : '';
    let counter = 0;

    const onImgLoad = ({ target: img }) => {

      const { offsetHeight: height, offsetWidth: width } = img;
      if (width > height) {
        img.className = ' landscape';
      } else if (width < height) {
        img.className = ' portrait';
      } else {
        img.className = ' square';
      }
      counter++;
      if (counter === this.state.newImages) {
        this.toggleLoad();
      }
    };

    const imageList = this.state.images;
    const images = imageList.map((img, index) => {
      if (!img) {
        return <h5 key="no-photos"> Sorry, no photos!</h5>;
      } else {
        const { imageUrl, photoId } = img;
        if (index === imageList.length - 10) {
          return <img onLoad={onImgLoad} ref={this.observerImage} onClick={this.imgModal} key={photoId} src={imageUrl} id={photoId} alt='surfing' />;
        } else {
          return <img onLoad={onImgLoad} onClick={this.imgModal} key={photoId} src={imageUrl} id={photoId} alt='surfing' />;
        }
      }
    });

    return (
      <>
      <Loader show={showLoader} container="loading-container-top"/>
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
          <div className={footer}>
            <div className='d-flex center'>
              <div className='blue-circle circle'></div>
              <div className='green-circle circle'></div>
            </div>
            <p className='mt-3 mb-5 center footer-text'>You&apos;ve seen all the surfr community photos!</p>
          </div>
      </div>
      </>
    );
  }
}
