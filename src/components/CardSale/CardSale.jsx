import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './styles.scss';

function CardSale({ image, name, old_price, new_price, id }) {
  const navigate = useNavigate();
  const location = useLocation();

  const addToOneProduct = () => {
    navigate(`/productproperty/${id}`, { state: { from: location.pathname } });
  };

  return (
    <div class="cardsale">
      <div className="cardsale__content" onClick={addToOneProduct}>
        <div className="cardsale__badge">
          <div class="cardsale__badge-title">Hot</div>
        </div>
        <div class="cardsale__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <h4 class="cardsale__title">{name}</h4>
        <div class="cardsale__bottom">
          <div class="cardsale__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
          <button className="cardsale__button">Подробнее</button>
        </div>
      </div>
    </div>
  );
}

export default CardSale;
