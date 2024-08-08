import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';

function CardBrand({ image, name }) {
  const [originalName] = React.useState(name);
  const navigate = useNavigate();
  const location = useLocation();

  const addToOneBrandCatalog = () => {
    const formattedName = originalName.replace(/\s+/g, '-').toLowerCase(); // Форматируем имя для URL
    navigate(`/onebrand/${formattedName}`, { state: { from: location.pathname, originalName } });
  };

  return (
    <div className="cardbrand">
      <div className="cardbrand__content" onClick={addToOneBrandCatalog}>
        <div className="cardbrand__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="brand_car" />
        </div>
        <h2 className="cardbrand__title">{name}</h2>
      </div>
    </div>
  );
}

export default CardBrand;
