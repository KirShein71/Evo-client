import React from 'react';
import './styles.scss';
import CardSale from '../CardSale/CardSale';
import { getSaleProduct } from '../../http/productApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Sale() {
  const [saleProducts, setSaleProducts] = React.useState([]);
  const [sliderRef, setSliderRef] = React.useState(null);

  React.useEffect(() => {
    getSaleProduct()
      .then((data) => setSaleProducts(data))
      .catch((error) => alert(error.response.data.message));
  }, []);

  const settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="sale">
      <div className="container">
        <div className="sale__header">
          <h2 className="sale__title">Актуальные акции</h2>
          <div className="sale__controls">
            <div className="sale__arrow" onClick={() => sliderRef?.slickPrev()}>
              <img src="./img/left.png" alt="arrow_left" />
            </div>
            <div className="sale__arrow" onClick={() => sliderRef?.slickNext()}>
              <img src="./img/right.png" alt="arrow_right" />
            </div>
          </div>
        </div>
        <div className="sale__content">
          <Slider ref={setSliderRef} {...settings}>
            {saleProducts.map((saleProduct) => (
              <CardSale {...saleProduct} key={saleProduct.id} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Sale;
