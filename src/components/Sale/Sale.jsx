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
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const data = await getSaleProduct();
        setSaleProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке распродаж:', error);
        alert(
          error.response?.data?.message ||
            'Не удалось загрузить распродажу. Пожалуйста, попробуйте позже.',
        );
      }
    };

    fetchSaleProducts();
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
  };

  return (
    <div className="sale">
      <div className="container">
        <div className="sale__header">
          <h2 className="sale__title">Лучшие предложения</h2>
          <div className="sale__controls">
            <div className="sale__arrow" onClick={() => sliderRef?.slickPrev()}>
              <img src="./img/left.png" alt="arrow_left" />
            </div>
            <div className="sale__arrow" onClick={() => sliderRef?.slickNext()}>
              <img src="./img/right.png" alt="arrow_right" />
            </div>
          </div>
        </div>
        {windowWidth > 768 ? (
          <div className="sale__content">
            <Slider ref={setSliderRef} {...settings}>
              {saleProducts.map((saleProduct) => (
                <CardSale {...saleProduct} key={saleProduct.id} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="sale__content-768">
            {saleProducts.map((saleProduct) => (
              <CardSale {...saleProduct} key={saleProduct.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sale;
