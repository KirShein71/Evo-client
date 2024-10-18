import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function CardBrand({ image, name }) {
  const [originalName] = React.useState(name);

  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');

  return (
    <div className="cardbrand">
      <Link to={`/onebrand/${formattedName}`}>
        <div className="cardbrand__content">
          <div className="cardbrand__image">
            <img src={process.env.REACT_APP_IMG_URL + image} alt="brand_car" />
          </div>
          <h2 className="cardbrand__title">{name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default CardBrand;
