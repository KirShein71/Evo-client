import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';

function CardProduct({ name, old_price, new_price, image }) {
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
    <div className="cardproduct">
      <div className="cardproduct__content" onClick={addToOneProduct}>
        <div className="cardproduct__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div class="cardproduct__bottom">
          <h4 class="cardproduct__title">{name}</h4>
          <div class="cardproduct__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
