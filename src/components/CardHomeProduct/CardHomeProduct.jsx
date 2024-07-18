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
          <img src={process.env.REACT_APP_IMG_URL + image} alt="rug for home" />
        </div>
      </div>
      <div class="cardhomeproduct__bottom">
        <h4 class="cardhomeproduct__title">{name}</h4>
        <div class="cardhomeproduct__price">{new_price} Р</div>
      </div>
    </div>
  );
}

export default CardHomeProduct;
