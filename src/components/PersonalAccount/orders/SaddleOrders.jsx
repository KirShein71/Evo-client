import React from 'react';
import './style.scss';

function SaddleOrders({ saddle }) {
  return (
    <div className="product-orders">
      <div className="product-orders__content">
        <div className="product-orders__image">
          <img
            className="product-orders__image-saddle"
            src={process.env.REACT_APP_IMG_URL + saddle?.image}
            alt="saddle__image"
          />
        </div>
        <div className="product-orders__information">
          <div className="product-orders__information-name">{saddle.name}</div>
          <div className="product-orders__information-options">Цена: {saddle.new_price}</div>
          <div className="product-orders__information-options">Количество: 1 шт</div>
        </div>
      </div>
    </div>
  );
}

export default SaddleOrders;
