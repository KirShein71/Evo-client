import React from 'react';
import './style.scss';

function SteelOrder({ steel }) {
  return (
    <div className="product-orders">
      <div className="product-orders__content">
        <div className="product-orders__image">
          <img
            className="product-orders__image-steel"
            src={process.env.REACT_APP_IMG_URL + steel?.image}
            alt="saddle__image"
          />
        </div>
        <div className="product-orders__information">
          <div className="product-orders__information-name">{steel.name}</div>
          <div className="product-orders__information-options">Цена: {steel.new_price}</div>
          <div className="product-orders__information-options">Количество: 1 шт</div>
        </div>
      </div>
    </div>
  );
}

export default SteelOrder;
