import React from 'react';
import Navbar from '../components/navbar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.nextImg = this.nextImg.bind(this);
    this.state = {
      imageId: 0
    };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.nextImg(), 4000);
  }

  nextImg() {
    const id = this.state.imageId;
    if (id > this.props.list.length - 2) {
      this.setState({ imageId: 0 });
    } else {
      this.setState({ imageId: id + 1 });
    }
  }

  render() {
    let opacity;
    const images = this.props.list;
    let imageId = 0;
    const imgList = images.map(img => {
      if (imageId > images.length - 1) {
        imageId = 0;
      }
      if (imageId === this.state.imageId) {
        opacity = '';
      } else {
        opacity = 'hidden';
      }
      imageId++;
      return (
        <img key={imageId} src={img} alt='surfing' className={`img-homepage ${opacity}`} />
      );
    });
    return (
    <>
      <Navbar opacity='opacity-75' />
      <div id="home-page">
         <div className="hero-image">
         {imgList}
          </div>
          <div id="explore" className="overlay-homepage center">
            <div id="explore-text" className="d-flex center">
              <div className="center">
                <h1 className="home-title">Find your inspiration. <br/></h1>
                <h3 className=" home-subtitle mt-4">Join the Surfr community, home to surf <br/> photographers all over the world.</h3>
                <div>
                  <a href="#explore" type="button" className="mt-5 btn btn-light btn-lg button">Explore</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
    );
  }
}
