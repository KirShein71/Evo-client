import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import './style.scss';

function HomeProductModal({
  closedModalToBasket,
  name,
  selectedMaterialName,
  price,
  quantity,
  selectedMaterialId,
  homeImages,
  goToCart,
}) {
  return (
    <div className="overlay__homeproduct-modal">
      <div className="homeproductmodal">
        <div className="homeproductmodal__close">
          <ClearIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={closedModalToBasket} />
        </div>
        <div className="homeproductmodal__title">Товар добавлен в корзину</div>
        <div className="homeproductmodal__content">
          {homeImages.map((iconModal) => (
            <div
              className="homeproductmodal__content-image"
              key={iconModal.id}
              style={{
                display: iconModal.materialId === selectedMaterialId ? 'block' : 'none',
              }}>
              <img src={process.env.REACT_APP_IMG_URL + iconModal.image} alt="bag" />
            </div>
          ))}
          <div className="homeproductmodal__content-description">
            <h3 className="homeproductmodal__content-description__title">{name}</h3>
            <div className="homeproductmodal__content-description__item">
              Цвет: {selectedMaterialName}
            </div>
            <div className="homeproductmodal__content-description__item">
              Цена: {price * quantity} Р ({quantity} шт)
            </div>
          </div>
        </div>
        <div className="homeproductmodal__bottom">
          <button className="homeproductmodal__bottom-back" onClick={closedModalToBasket}>
            Продолжить покупки
          </button>
          <button className="homeproductmodal__bottom-cart" onClick={() => goToCart()}>
            Оформить
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeProductModal;
