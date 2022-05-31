import React from 'react';
// import HelloWorld from '../components/hello-world';
import Navbar from '../components/navbar';

export default function Home(props) {
  return (
    <div>
      <Navbar />
      <div id="home-page">
        <div className="hero-image">
          <img className="img-homepage" src="/images/example1.jpg" alt="surfing"/>
            <img className="img-homepage" src="/images/example2.jpg" alt="surfing"/>
              <img className="img-homepage" src="/images/example3.jpg" alt="surfing"/>
                <img className="img-homepage" src="/images/example7.jpg" alt="surfing"/>
                </div>
                <div id="explore" className="container-modal center">
                  <div id="explore-text" className="row center">
                    <div id="div" className="column-full center">
                      <h1 className="">Find your inspiration. <br/></h1>
                      <h3 className=" join mt-4">Join the Surfr community, home to surf <br/> photographers all over the world.</h3>
                      <div>
                        <button id="button" type="button" className="mt-5 btn btn-light btn-lg">Explore</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  );
}
