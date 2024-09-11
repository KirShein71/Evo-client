import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function CarouselSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <Link to="/allbrands">
          <img
            className="carousel-image"
            src="./img/rung.png"
            text="Second slide"
            alt="image_slider"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/homeproduct">
          <img
            className="carousel-image"
            src="./img/home.png"
            text="Second slide"
            alt="image_slider"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/animals">
          <img
            className="carousel-image"
            src="./img/animal.png"
            text="Third slide"
            alt="image_slider"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselSlider;
