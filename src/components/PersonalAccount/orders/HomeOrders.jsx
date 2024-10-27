import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function HomeOrders({ material, home, quantity, materialId }) {
  return (
    <div className="product-orders">
      <div className="product-orders__content">
        <div className="product-orders__image">
          {home?.home_images
            .filter((imageHome) => imageHome.materialId === materialId)
            .map((imageHome) => (
              <div className="baskettable__homeimage">
                <img src={process.env.REACT_APP_IMG_URL + imageHome.image} alt="home rug image" />
              </div>
            ))}
        </div>
        <div className="product-orders__information">
          <Link to="/homeproduct">
            <div className="product-orders__information-name">{home?.name}</div>
          </Link>
          <div className="product-orders__information-options">Форма ячейки: Сота</div>
          <div className="product-orders__information-options">Цвет материала: {material.name}</div>
          <div className="product-orders__information-options">Цена: {home.new_price}</div>
          <div className="product-orders__information-options">Количество: {quantity} шт</div>
        </div>
      </div>
    </div>
  );
}

export default HomeOrders;
