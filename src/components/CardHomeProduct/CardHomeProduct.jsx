import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

function CardHomeProduct({ name, new_price, image, id }) {
  const navigate = useNavigate();
  const location = useLocation();

  const addToOneAnimalProduct = () => {
    navigate(`/homeproductproperty/${id}`, { state: { from: location.pathname } });
  };
  return (
    <div className="cardhomeproduct" onClick={addToOneAnimalProduct}>
      <div className="cardhomeproduct__content">
        <div className="cardhomeproduct__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div className="cardhomeproduct__title">{name}</div>
      </div>
      <div className="cardhomeproduct__bottom">
        <div className="cardhomeproduct__price">
          <div className="cardhomeproduct__price-newprice">{new_price} Р</div>
        </div>
        <button className="cardhomeproduct__button">Подробнее</button>
      </div>
    </div>
  );
}

export default CardHomeProduct;
