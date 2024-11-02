import React from 'react';
import { Link } from 'react-router-dom';

function CardPromo({ image, name }) {
  const [originalName] = React.useState(name);

  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');

  return (
    <div className="card-promo">
      <Link to={`/onebrand/${formattedName}`}>
        <div className="card-promo__content">
          <div className="card-promo__image">
            <img src={process.env.REACT_APP_IMG_URL + image} alt="brand_car" />
          </div>
          <h2 className="card-promo__title">{name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default CardPromo;
