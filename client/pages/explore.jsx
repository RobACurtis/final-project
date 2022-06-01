import React from 'react';
import Navbar from '../components/navbar';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null
    };
  }

  componentDidMount() {
    fetch('/api/explore-images')
      .then(res => res.json())
      .then(images => this.setState({ images }));
  }

  render() {
    if (!this.state.images) return null;
    const imageList = this.state.images;
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

    let imageId = 0;
    const images = imageList.map(img => {
      imageId++;
      const { imageUrl } = img;
      return (
    <img onLoad={onImgLoad} key={imageId} src={imageUrl} alt='surfing' />
      );
    });

    return (
      <>
      <Navbar />
      <div id="gallery-container" className="container mt-5 pt-5">
          <div id="gallery" className="img-gallery">
            {images}
          </div>
      </div>
      </>
    );
  }
}
