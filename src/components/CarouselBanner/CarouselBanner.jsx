import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

import './style.scss';

function CarouselBanner() {
  return (
    <div className="banner">
      <div>
        <Carousel>
          <Carousel.Item>
            <Link to="/allbrands">
              <img
                className="banner__image"
                src="./img/rug.jpg"
                text="Second slide"
                alt="image_slider"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/accessories">
              <img
                className="banner__image"
                src="./img/bag.jpg"
                text="Second slide"
                alt="image_slider"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="banner__image"
              src="./img/delivery.jpg"
              text="Third slide"
              alt="image_slider"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselBanner;
