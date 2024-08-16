import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

function CardSale({ image, name, old_price, new_price }) {
  const [originalName] = React.useState(name);
  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');

  return (
    <div class="cardsale">
      <Link to={`/productproperty/${formattedName}`} className="cardsale__content">
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
      </Link>
    </div>
  );
}

export default CardSale;
