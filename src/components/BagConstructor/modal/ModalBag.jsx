import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import './style.scss';

function ModalBag({
  closedBagModal,
  bag,
  selectedBagSize,
  selectedBagmaterialId,
  bagmaterials,
  bagsizes,
  quantity,
  goToCart,
}) {
  return (
    <div className="overlay__modalbag">
      <div className="modalbag">
        <div className="modalbag__close">
          <ClearIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={closedBagModal} />
        </div>
        <div className="modalbag__title">Товар добавлен в корзину</div>
        <div className="modalbag__content">
          {bag.bag_images?.map((bagImage) => {
            return (
              <>
                <div
                  className="modalbag__content-image"
                  key={bagImage.id}
                  style={{
                    display:
                      bagImage.bagmaterialId === selectedBagmaterialId &&
                      bagImage.bagsizeId === selectedBagSize
                        ? 'block'
                        : 'none',
                  }}>
                  <img src={process.env.REACT_APP_IMG_URL + bagImage.image} alt="image bag" />
                </div>
              </>
            );
          })}
          <div className="modalbag__content-description">
            <h3 className="modalbag__content-description__title">{bag.name}</h3>
            {bagmaterials
              .filter((materialsItem) => materialsItem.id === selectedBagmaterialId)
              .map((materialsItem) => (
                <div key={materialsItem.id} className="modalbag__content-description__item">
                  Цвет: {materialsItem.name}
                </div>
              ))}
            {bagsizes
              .filter((sizesItem) => sizesItem.id === selectedBagSize)
              .map((sizesItem) => (
                <>
                  <div key={sizesItem.id} className="modalbag__content-description__item">
                    Размер: {sizesItem.size} см
                  </div>
                  <div key={sizesItem.id} className="modalbag__content-description__item">
                    Цена: {sizesItem.price * quantity} Р ({quantity} шт)
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="modalbag__bottom">
          <button className="modalbag__bottom-back" onClick={closedBagModal}>
            Продолжить покупки
          </button>
          <button className="modalbag__bottom-cart" onClick={() => goToCart()}>
            Оформить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBag;
