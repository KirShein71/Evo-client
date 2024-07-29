import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './styles.scss';

function CardSale({ image, name, old_price, new_price }) {
  const [originalName] = React.useState(name);
  const navigate = useNavigate();
  const location = useLocation();

  const addToOneProduct = () => {
    const formattedName = originalName.replace(/\s+/g, '-').toLowerCase(); // Форматируем имя для URL
    navigate(`/productproperty/${formattedName}`, {
      state: { from: location.pathname, originalName },
    });
  };

  return (
    <div class="cardsale">
      <div className="cardsale__content" onClick={addToOneProduct}>
        <div class="cardsale__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div class="cardsale__bottom">
          <h4 class="cardsale__title">{name}</h4>
          <div class="cardsale__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSale;
