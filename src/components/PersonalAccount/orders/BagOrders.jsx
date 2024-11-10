import React from 'react';
import './style.scss';

function BagOrders({ bagmaterial, bag, bagmaterialId, bagsizeId, bagsize, quantity }) {
  return (
    <div className="product-orders">
      <div className="product-orders__content">
        <div className="product-orders__image">
          {bag.bag_images
            .filter(
              (imageBag) =>
                imageBag.bagmaterialId === bagmaterialId && imageBag.bagsizeId === bagsizeId,
            )
            .map((imageBag) => (
              <div className="baskettable__animalimage">
                <img src={process.env.REACT_APP_IMG_URL + imageBag.image} alt="bag" />
              </div>
            ))}
        </div>
        <div className="product-orders__information">
          <div className="product-orders__information-name">{bag.name}</div>
          <div className="product-orders__information-options">
            Цвет материала: {bagmaterial.name}
          </div>
          <div className="product-orders__information-options">Размер: {bagsize.size} см</div>
          <div className="product-orders__information-options">Цена: {bag.price}</div>
          <div className="product-orders__information-options">Количество: {quantity} шт</div>
        </div>
      </div>
    </div>
  );
}

export default BagOrders;
