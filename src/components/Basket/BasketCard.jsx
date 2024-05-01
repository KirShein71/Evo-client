import React from 'react';

import './style.scss';

function BasketCard({
  product,
  material,
  cellshape,
  edging,
  body,
  trunk,
  remove,
  id,
  quantity,
  quantity_trunk,
}) {
  return (
    <div className="basketcard">
      {product === null ? (
        <>
          <div className="basketcard__content">
            <div className="basketcard__delete">
              <img src="./img/delete.png" alt="delete" onClick={() => remove(id)} />
            </div>
            <div className="basketcard__content-left">
              <div className="basketcard__content-left__image">
                <img
                  className="edging__image"
                  src={process.env.REACT_APP_IMG_URL + edging.image}
                  alt="edging__image"
                />
                <img
                  className="material__image"
                  src={process.env.REACT_APP_IMG_URL + material.image}
                  alt="material__image"
                />
              </div>
            </div>
            <div className="basketcard__content-right">
              <div className="basketcard__content-right__information">
                <div className="basketcard__content-right__name">
                  {trunk.product?.name}(Коврик в багажник)
                </div>
                <div className="basketcard__content-right__body">Тип кузова: {body.name}</div>
                <div className="basketcard__content-right__cellshape">
                  Форма ячейки: {cellshape?.name === 'sota' ? 'Сота' : 'Ромб'}
                </div>
                <div className="basketcard__content-right__material">
                  Цвет материала: {material.name}
                </div>
                <div className="basketcard__content-right__edging">Цвет канта: {edging.name}</div>
              </div>
              <div className="basketcard__content-right__numbers">
                <div className="basketcard__content-right__quantity">
                  Количество: {quantity_trunk} шт
                </div>
                <div className="basketcard__content-right__price">
                  Цена: {trunk?.new_price * quantity_trunk} Р{' '}
                  <span>(цена за 1шт: {trunk.new_price} Р)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="basketcard__bottom">
            <div className="basketcard__total">{trunk?.new_price * quantity_trunk} Р</div>
          </div>
        </>
      ) : (
        <>
          <div className="basketcard__content">
            <div className="basketcard__delete">
              <img src="./img/delete.png" alt="delete" onClick={() => remove(id)} />
            </div>
            <div className="basketcard__content-left">
              <div className="basketcard__content-left__image">
                <img
                  className="edging__image"
                  src={process.env.REACT_APP_IMG_URL + edging.image}
                  alt="edging__image"
                />
                <img
                  className="material__image"
                  src={process.env.REACT_APP_IMG_URL + material.image}
                  alt="material__image"
                />
              </div>
            </div>
            <div className="basketcard__content-right">
              <div className="basketcard__content-right__information">
                <div className="basketcard__content-right__name">
                  {product === null ? trunk.product.name : product.name}
                </div>
                <div className="basketcard__content-right__body">Тип кузова: {body.name}</div>
                <div className="basketcard__content-right__cellshape">
                  Форма ячейки: {cellshape?.name === 'sota' ? 'Сота' : 'Ромб'}
                </div>
                <div className="basketcard__content-right__material">
                  Цвет материала: {material.name}
                </div>
                <div className="basketcard__content-right__edging">Цвет канта: {edging.name}</div>
              </div>
              <div className="basketcard__content-right__numbers">
                <div className="basketcard__content-right__quantity">Количество: {quantity} шт</div>
                <div className="basketcard__content-right__price">
                  Цена: {product.new_price * quantity} Р{' '}
                  <span>(цена за 1шт: {product.new_price} Р)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="basketcard__bottom">
            {trunk === null ? (
              ''
            ) : (
              <div className="basketcard__bottom-content">
                <div className="basketcard__bottom-content__title">
                  + Коврик в багажник: {quantity_trunk} шт
                </div>
                <div className="basketcard__bottom-content__price">
                  Цена: {trunk.new_price * quantity_trunk} Р{' '}
                  <span>(цена за 1шт: {trunk.new_price} Р)</span>{' '}
                </div>
              </div>
            )}
            <div className="basketcard__total">
              {trunk === null
                ? product?.new_price * quantity
                : trunk?.new_price * quantity_trunk + product.new_price * quantity}{' '}
              Р
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BasketCard;
