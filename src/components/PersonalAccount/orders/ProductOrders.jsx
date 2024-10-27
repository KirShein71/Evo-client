import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function ProductOrders({ edging, material, product, thirdrow, quantity }) {
  return (
    <div className="product-orders">
      <div className="product-orders__content">
        <div className="product-orders__image">
          <img
            className="product-orders__image-edging"
            src={process.env.REACT_APP_IMG_URL + edging?.image}
            alt="edging__image"
          />
          <img
            className="product-orders__image-material"
            src={process.env.REACT_APP_IMG_URL + material?.image}
            alt="material__image"
          />
        </div>
        <div className="product-orders__information">
          <Link to={`/productproperty/${product.name.replace(/-+/g, '--').replace(/s+/g, '-')}`}>
            <div className="product-orders__information-name">
              Комплект ковриков для: {product.name}
            </div>
          </Link>
          <div className="product-orders__information-options">Форма ячейки: Сота</div>
          <div className="product-orders__information-options">Цвет материала: {material.name}</div>
          <div className="product-orders__information-options">Цвет канта: {edging.name}</div>
          <div className="product-orders__information-options">
            Цена: {thirdrow === null ? product.new_price : thirdrow?.new_price}
          </div>
          <div className="product-orders__information-options">Количество: {quantity} шт</div>
        </div>
      </div>
    </div>
  );
}

export default ProductOrders;
