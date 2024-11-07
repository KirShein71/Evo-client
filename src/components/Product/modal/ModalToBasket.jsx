import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import './style.scss';

function ModalToBasket({
  closedModalToBasket,
  name,
  materialColor,
  edgingColor,
  materials,
  edgings,
  selectedMaterial,
  selectedEdging,
  price,
  quantity,
  steel,
  saddle,
  trunk,
  thirdrowId,
  thirdrow,
  productId,
  goToCart,
}) {
  return (
    <div className="overlay__modaltobasket-modal">
      <div className="modaltobasket">
        <div className="modaltobasket__close">
          <ClearIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={closedModalToBasket} />
        </div>
        <div className="modaltobasket__title">Товар добавлен в корзину</div>
        <div className="modaltobasket__content">
          <div className="modaltobasket__image">
            {materials.map((imageMaterial) => (
              <div
                key={imageMaterial.id}
                style={{
                  display: imageMaterial.color === selectedMaterial ? 'block' : 'none',
                }}>
                <img
                  className="image_one"
                  src={process.env.REACT_APP_IMG_URL + imageMaterial.image}
                  alt="car mat"
                />
              </div>
            ))}
            {edgings.map((imageEdging) => (
              <div
                key={imageEdging.id}
                style={{ display: imageEdging.color === selectedEdging ? 'block' : 'none' }}>
                <img
                  className="image_two"
                  src={process.env.REACT_APP_IMG_URL + imageEdging.image}
                  alt="car mat"
                />
              </div>
            ))}
          </div>
          <div className="modaltobasket__content-description">
            {productId === null && thirdrowId === null && trunk !== null ? (
              <h3 className="modaltobasket__content-description__title">
                Eva-коврик в багажник для: {name}
              </h3>
            ) : (
              <h3 className="modaltobasket__content-description__title">Eva-коврик для: {name}</h3>
            )}

            <div className="modaltobasket__content-description__item">
              Цвет материала: {materialColor}
            </div>
            <div className="modaltobasket__content-description__item">
              Цвет канта: {edgingColor}
            </div>
            {productId !== null || thirdrowId !== null ? (
              thirdrowId ? (
                thirdrow
                  .filter((thirdrowModal) => thirdrowModal.id === thirdrowId)
                  .map((thirdrowModal) => (
                    <div
                      className="modaltobasket__content-description__item"
                      key={thirdrowModal.id}>
                      Цена: {thirdrowModal.new_price * quantity} Р ({quantity} шт)
                    </div>
                  ))
              ) : (
                <div className="modaltobasket__content-description__item">
                  Цена: {price * quantity} Р ({quantity} шт)
                </div>
              )
            ) : (
              ''
            )}
            {steel ? (
              <div className="modaltobasket__content-description__item">
                Подпятник стальной 'Z': 790 Р
              </div>
            ) : (
              ''
            )}
            {saddle ? (
              <div className="modaltobasket__content-description__item">
                Подпятник алюминевый: 490 Р
              </div>
            ) : (
              ''
            )}
            {trunk ? (
              <div className="modaltobasket__content-description__item">
                Коврик в багажник: 2090 Р
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="modaltobasket__bottom">
          <button className="modaltobasket__bottom-back" onClick={closedModalToBasket}>
            Продолжить покупки
          </button>
          <button className="modaltobasket__bottom-cart" onClick={() => goToCart()}>
            Оформить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalToBasket;
