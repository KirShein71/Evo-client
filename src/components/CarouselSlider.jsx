import Carousel from 'react-bootstrap/Carousel';

function CarouselSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="carousel-image"
          src="./img/slider1.jpg"
          text="Second slide"
          alt="image_slider"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image"
          src="./img/slider2.jpg"
          text="Second slide"
          alt="image_slider"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image"
          src="./img/slider3.jpg"
          text="Third slide"
          alt="image_slider"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselSlider;
