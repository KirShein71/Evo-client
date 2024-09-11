import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './style.scss';

function CarouselBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, settings.autoplaySpeed);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="banner">
      <div style={{ width: '90%' }}>
        <Slider {...settings} ref={sliderRef}>
          <div className="banner__slide">
            <Link to="/allbrands">
              <img
                className="banner-image"
                src="./img/rug.png"
                text="Second slide"
                alt="image_slider"
              />
            </Link>
          </div>
          <div className="banner__slide">
            <Link to="/homeproduct">
              <img
                className="banner-image"
                src="./img/bag.png"
                text="Second slide"
                alt="image_slider"
              />
            </Link>
          </div>
          <div className="banner__slide">
            <Link to="/homeproduct">
              <img
                className="banner-image"
                src="./img/delivery.png"
                text="Second slide"
                alt="image_slider"
              />
            </Link>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default CarouselBanner;
