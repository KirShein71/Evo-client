import React from 'react';

import './style.scss';

function BagSize({
  handleBagFourtyChange,
  bagFourtyChecked,
  bagFourtyQuantity,
  setBagFourtyQuantity,
  bagFourty,
  isCountBagFourtyDisabled,
  handleBagFiftyChange,
  bagFiftyChecked,
  bagFiftyQuantity,
  bagFifty,
  isCountBagFiftyDisabled,
  setBagFiftyQuantity,
}) {
  return (
    <div className="bagsize">
      <div className="bagsize__title">Выберите размер</div>
      <div className="bagsize__content">
        {bagFourty.map((bagFourty) => (
          <>
            <div key={bagFourty.id}>
              <div className="checkbox" style={{ display: 'flex' }}>
                <div class="cntr">
                  <label for="cbxBagOrganizers" class="label-cbx">
                    <input
                      id="cbxBagOrganizers"
                      type="checkbox"
                      class="invisible"
                      checked={bagFourtyChecked}
                      onChange={() => {
                        handleBagFourtyChange(bagFourty.id);
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
                  <span>{bagFourty.size} см</span>
                  <p>{bagFourty.price * bagFourtyQuantity} Р</p>
                </div>
              </div>
            </div>
            <div className="bagsize-equipment__quantity">
              <button
                className="bagsize-equipment__minus"
                onClick={() => setBagFourtyQuantity(bagFourtyQuantity - 1)}
                disabled={isCountBagFourtyDisabled}>
                <img src="../img/minus.png" alt="minus" />
              </button>
              <div className="bagsize-equipment__total">{bagFourtyQuantity}</div>
              <button className="bagsize-equipment__plus">
                <img
                  src="../img/plus.png"
                  alt="plus"
                  onClick={() => setBagFourtyQuantity(bagFourtyQuantity + 1)}
                />
              </button>
            </div>
          </>
        ))}
        {bagFifty.map((bagFifty) => (
          <>
            <div key={bagFifty.id}>
              <div className="checkbox" style={{ display: 'flex' }}>
                <div class="cntr">
                  <label for="cbxbagFifty" class="label-cbx">
                    <input
                      id="cbxbagFifty"
                      type="checkbox"
                      class="invisible"
                      checked={bagFiftyChecked}
                      onChange={() => {
                        handleBagFiftyChange(bagFifty.id);
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
                <div className="organizer__checkbox">
                  <span>{bagFifty.size} см</span>
                  <p>{bagFifty.price * bagFiftyQuantity} Р</p>
                </div>
              </div>
              <div className="organizer-equipment__quantity">
                <button
                  className="organizer-equipment__minus"
                  onClick={() => setBagFiftyQuantity(bagFiftyQuantity - 1)}
                  disabled={isCountBagFiftyDisabled}>
                  <img src="../img/minus.png" alt="minus" />
                </button>
                <div className="organizer-equipment__total">{bagFiftyQuantity}</div>
                <button className="organizer-equipment__plus">
                  <img
                    src="../img/plus.png"
                    alt="plus"
                    onClick={() => setBagFiftyQuantity(bagFiftyQuantity + 1)}
                  />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default BagSize;
