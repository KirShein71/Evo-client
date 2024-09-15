import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './style.scss';

function CarouselBanner() {
  return (
    <div className="banner">
      <div className="container">
        <Carousel>
          <Carousel.Item>
            <Link to="/allbrands">
              <img className="banner__image" src="./img/rug.png" alt="image_slider" />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/accessories">
              <img className="banner__image" src="./img/bag.png" alt="image_slider" />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/homeproduct">
              <img className="banner__image" src="./img/universal.png" alt="image_slider" />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <img className="banner__image" src="./img/delivery.png" alt="image_slider" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselBanner;
