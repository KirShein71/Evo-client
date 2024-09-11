import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

function CarouselBanner() {
  const [sliderRef, setSliderRef] = React.useState(null);

  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    dots: true,
  };
  return (
    <div className="banner">
      <div className="sale__arrow" onClick={() => sliderRef?.slickPrev()}>
        <img src="./img/left.png" alt="arrow_left" />
      </div>

      <Slider {...settings} ref={setSliderRef}>
        <div className="banner__slide">
          <Link to="/allbrands">
            <img
              className="banner-image"
              src="./img/rug.jpg"
              text="Second slide"
              alt="image_slider"
            />
          </Link>
        </div>
        <div className="banner__slide">
          <Link to="/homeproduct">
            <img
              className="banner-image"
              src="./img/bag.jpg"
              text="Second slide"
              alt="image_slider"
            />
          </Link>
        </div>
        <div className="banner__slide">
          <Link to="/homeproduct">
            <img
              className="banner-image"
              src="./img/delivery.jpg"
              text="Second slide"
              alt="image_slider"
            />
          </Link>
        </div>
      </Slider>
      <div className="sale__arrow" onClick={() => sliderRef?.slickNext()}>
        <img src="./img/right.png" alt="arrow_right" />
      </div>
    </div>
  );
}

export default CarouselBanner;
