import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function CarouselSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <Link to="/allbrands">
          <img className="carousel-image" src="./img/rug-mob.png" alt="image_slider" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/homeproduct">
          <img className="carousel-image" src="./img/bag-mob.png" alt="image_slider" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/animals">
          <img className="carousel-image" src="./img/universal-mob.jpg" alt="image_slider" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/animals">
          <img className="carousel-image" src="./img/delivery-mob.png" alt="image_slider" />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselSlider;
