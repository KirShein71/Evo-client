import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

function CardResult({ name, old_price, new_price, image, id }) {
  const navigate = useNavigate();
  const location = useLocation();

  const addToOneProduct = () => {
    navigate(`/productproperty/${id}`, { state: { from: location.pathname } });
  };

  return (
    <div className="cardresult">
      <div className="cardresult__content" onClick={addToOneProduct}>
        <div className="cardresult__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div class="cardresult__bottom">
          <h4 class="cardresult__title">{name}</h4>
          <div class="cardresult__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardResult;
