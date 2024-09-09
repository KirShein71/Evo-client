import React from 'react';
import './style.scss';

function BagSize({
  bagsizes,
  selectedBagSize,
  setSelectedBagSize,
  bagSizeQuantity,
  setBagSizeQuantity,
  isCountBagSizeDisabled,
}) {
  return (
    <div className="bagsize">
      <div className="bagsize__title">Выберите размер</div>
      <div className="bagsize__content">
        <div className="bagsize__content-size">
          {bagsizes.map((bagSize) => (
            <>
              <div key={bagSize.id}>
                <div className="checkbox" style={{ display: 'flex' }}>
                  <div class="cntr">
                    <label for={`cbxBagSizes-${bagSize.id}`} class="label-cbx">
                      <input
                        id={`cbxBagSizes-${bagSize.id}`}
                        type="checkbox"
                        class="invisible"
                        checked={selectedBagSize === bagSize.id}
                        onChange={() => {
                          setSelectedBagSize(bagSize.id);
                        }}
                      />
                      <div class="checkbox">
                        <svg width="20px" height="20px" viewBox="0 0 20 20">
                          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                          <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                      </div>
                    </label>
                  </div>{' '}
                  <div className="bagsize__checkbox">
                    <span>{bagSize.size} см</span>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        {bagsizes
          .filter((bagPrice) => bagPrice.id === selectedBagSize)
          .map((bagPrice) => (
            <div className="bagsize__checkbox">
              <p>Стоимость: {bagPrice.price * bagSizeQuantity} Р</p>
            </div>
          ))}
        <div className="bagsize-equipment__quantity">
          <button
            className="bagsize-equipment__minus"
            onClick={() => setBagSizeQuantity(bagSizeQuantity - 1)}
            disabled={isCountBagSizeDisabled}>
            <img src="../img/minus.png" alt="minus" />
          </button>
          <div className="bagsize-equipment__total">{bagSizeQuantity}</div>
          <button className="bagsize-equipment__plus">
            <img
              src="../img/plus.png"
              alt="plus"
              onClick={() => setBagSizeQuantity(bagSizeQuantity + 1)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BagSize;
