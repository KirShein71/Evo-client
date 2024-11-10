import React from 'react';
import { Link } from 'react-router-dom';

function CardBag({ name, new_price, image }) {
  const [originalName] = React.useState(name);
  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');
  return (
    <div className="cardbag">
      <Link to={`/organizer/${formattedName}`}>
        <div className="cardbag__content">
          <div className="cardbag__image">
            <img src={process.env.REACT_APP_IMG_URL + image} alt="bag" />
          </div>
          <div class="cardbag__bottom">
            <h4 class="cardbag__title">{name}</h4>
            <div class="cardbag__price"> от {new_price} Р</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardBag;
