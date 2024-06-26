import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';

function CardProduct({ name, old_price, new_price, image, id }) {
  const navigate = useNavigate();
  const location = useLocation();

  const addToOneProduct = () => {
    navigate(`/productproperty/${id}`, { state: { from: location.pathname } });
  };

  return (
    <div className="cardproduct">
      <div className="cardproduct__content" onClick={addToOneProduct}>
        <div className="cardproduct__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <h4 class="cardproduct__title">{name}</h4>
        <div class="cardproduct__bottom">
          <div class="cardproduct__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
          <button className="cardproduct__button">Подробнее</button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
