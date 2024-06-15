import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

function CardAnimal({ name, old_price, new_price, image, id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const addToOneAnimalProduct = () => {
    navigate(`/animalsproperty/${id}`, { state: { from: location.pathname } });
  };
  return (
    <div className="cardanimal">
      <div onClick={addToOneAnimalProduct} className="cardanimal__content">
        <div className="cardanimal__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div className="cardanimal__title">{name}</div>
      </div>
      <div className="cardanimal__bottom">
        <div className="cardanimal__price">
          <div className="cardanimal__price-oldprice">{old_price} Р</div>
          <div className="cardanimal__price-newprice">{new_price} Р</div>
        </div>
        <button className="cardanimal__button">Подробнее</button>
      </div>
    </div>
  );
}

export default CardAnimal;
