import React from 'react';

import './style.scss';

function Equipment({
  thirdrow,
  isSalonChecked,
  handleSalonCheckboxChange,
  product,
  isSecondrowChecked,
  handleSecondrowCheckboxChange,
  isThirdrowChecked,
  handleThirdrowCheckboxChange,
  quantity,
  setQuantity,
  isCountDisabled,
  trunk,
  isTrunkChecked,
  handleTrunkCheckboxChange,
  trunkQuantity,
  setTrunkQuantity,
  isCountTrunkDisabled,
  handleMaxTrunkCheckboxChange,
  selectedProductTrunk,
}) {
  return (
    <div className="equipment">
      <div className="equipment__content">
        <div className="equipment__title">Выберите комплектацию</div>
        {thirdrow.length > 0 ? (
          <div className="equipment__interior">
            {thirdrow?.map((thirdrow) => (
              <div key={thirdrow.id}>
                <div className="checkbox">
                  <div className="cntr">
                    <label for="cbxSalon" class="label-cbx">
                      <input
                        id="cbxSalon"
                        type="checkbox"
                        class="invisible"
                        checked={isSalonChecked}
                        onChange={() => {
                          handleSalonCheckboxChange(product.id);
                        }}
                      />
                      <div className="checkbox">
                        <svg width="20px" height="20px" viewBox="0 0 20 20">
                          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                          <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                      </div>
                    </label>
                  </div>{' '}
                  <span>Комплект ковриков в салон</span>
                </div>
                {isSalonChecked && (
                  <div className="rows__rug">
                    <div className="rows__rug-two">
                      <div className="checkbox">
                        <div className="cntr">
                          <label for="cbxTwo" class="label-cbx">
                            <input
                              id="cbxTwo"
                              type="checkbox"
                              class="invisible"
                              checked={isSecondrowChecked}
                              onChange={() => {
                                handleSecondrowCheckboxChange();
                              }}
                            />
                            <div className="checkbox">
                              <svg width="20px" height="20px" viewBox="0 0 20 20">
                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                <polyline points="4 11 8 15 16 6"></polyline>
                              </svg>
                            </div>
                          </label>
                        </div>{' '}
                        <span>Комплект ковриков в 2 ряда</span>
                      </div>
                    </div>
                    <div className="rows__rug-three">
                      <div className="checkbox">
                        <div className="cntr">
                          <label for="cbxThree" class="label-cbx">
                            <input
                              id="cbxThree"
                              type="checkbox"
                              class="invisible"
                              checked={isThirdrowChecked}
                              onChange={() => {
                                handleThirdrowCheckboxChange(thirdrow.id);
                              }}
                            />
                            <div className="checkbox">
                              <svg width="20px" height="20px" viewBox="0 0 20 20">
                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                <polyline points="4 11 8 15 16 6"></polyline>
                              </svg>
                            </div>
                          </label>
                        </div>{' '}
                        <span>Комплект ковриков в 3 ряда</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="equipment__price">
                  <div className="equipment__oldPrice">
                    {isThirdrowChecked === false
                      ? product.old_price * quantity
                      : thirdrow.old_price * quantity}{' '}
                    Р
                  </div>
                  <div className="equipment__newPrice">
                    {isThirdrowChecked === false
                      ? product?.new_price * quantity
                      : thirdrow.new_price * quantity}{' '}
                    Р
                  </div>
                </div>
                <div className="equipment__quantity">
                  <button
                    className="minus"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={isCountDisabled}>
                    <img src="../img/minus.png" alt="minus" />
                  </button>
                  <div className="equipment__total">{quantity}</div>
                  <button onClick={() => setQuantity(quantity + 1)} className="plus">
                    <img src="../img/plus.png" alt="plus" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="equipment__interior">
            <div className="checkbox">
              <div className="cntr">
                <label for="cbxSalon" class="label-cbx">
                  <input
                    id="cbxSalon"
                    type="checkbox"
                    class="invisible"
                    checked={isSalonChecked}
                    onChange={() => {
                      handleSalonCheckboxChange(product.id);
                    }}
                  />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                </label>
              </div>{' '}
              <span>Комплект ковриков в салон</span>
            </div>
            <div className="equipment__price">
              <div className="equipment__oldPrice">{product?.old_price * quantity}</div>
              <div className="equipment__newPrice">{product?.new_price * quantity}</div>
            </div>
            <div className="equipment__quantity">
              <button
                className="minus"
                onClick={() => setQuantity(quantity - 1)}
                disabled={isCountDisabled}>
                <img src="../img/minus.png" alt="minus" />
              </button>
              <div className="equipment__total">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="plus">
                <img src="../img/plus.png" alt="plus" />
              </button>
            </div>
          </div>
        )}
        {trunk.length > 1 ? (
          <div className="equipment__maxtrunk">
            <div className="equipment__maxtrunk-title">Коврик в багажник:</div>
            <div className="equipment__maxtrunk-content">
              {trunk?.map((trunk) => (
                <div key={trunk.id}>
                  <div className="checkbox">
                    <div className="cntr">
                      <label for={`cbxTrunk-${trunk.id}`} class="label-cbx">
                        <input
                          id={`cbxTrunk-${trunk.id}`}
                          type="checkbox"
                          class="invisible"
                          checked={selectedProductTrunk === trunk.id}
                          onChange={() => {
                            handleMaxTrunkCheckboxChange(trunk.id);
                          }}
                        />
                        <div className="checkbox">
                          <svg width="20px" height="20px" viewBox="0 0 20 20">
                            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                            <polyline points="4 11 8 15 16 6"></polyline>
                          </svg>
                        </div>
                      </label>
                    </div>{' '}
                    <span>{trunk.name}</span>
                  </div>
                </div>
              ))}
              <div className="equipment__price">
                <div className="equipment__oldPrice">{2390 * trunkQuantity} Р</div>
                <div className="equipment__newPrice">{2190 * trunkQuantity} Р</div>
              </div>
              <div className="equipment__quantity">
                <button
                  className="minus"
                  onClick={() => setTrunkQuantity(trunkQuantity - 1)}
                  disabled={isCountTrunkDisabled}>
                  <img src="../img/minus.png" alt="minus" />
                </button>
                <div className="equipment__total">{trunkQuantity}</div>
                <button className="plus" onClick={() => setTrunkQuantity(trunkQuantity + 1)}>
                  <img src="../img/plus.png" alt="plus" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="equipment__trunk">
            {trunk?.map((trunk) => (
              <div key={trunk.id}>
                <div className="checkbox">
                  <div className="cntr">
                    <label for="cbxTrunk" class="label-cbx">
                      <input
                        id="cbxTrunk"
                        type="checkbox"
                        class="invisible"
                        checked={isTrunkChecked}
                        onChange={() => {
                          handleTrunkCheckboxChange(trunk.id);
                        }}
                      />
                      <div className="checkbox">
                        <svg width="20px" height="20px" viewBox="0 0 20 20">
                          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                          <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                      </div>
                    </label>
                  </div>{' '}
                  <span>Коврик в багажник</span>
                </div>
                <div className="equipment__price">
                  <div className="equipment__oldPrice">{trunk.old_price * trunkQuantity} Р</div>
                  <div className="equipment__newPrice">{trunk.new_price * trunkQuantity} Р</div>
                </div>
                <div className="equipment__quantity">
                  <button
                    className="minus"
                    onClick={() => setTrunkQuantity(trunkQuantity - 1)}
                    disabled={isCountTrunkDisabled}>
                    <img src="../img/minus.png" alt="minus" />
                  </button>
                  <div className="equipment__total">{trunkQuantity}</div>
                  <button className="plus">
                    <img
                      src="../img/plus.png"
                      alt="plus"
                      onClick={() => setTrunkQuantity(trunkQuantity + 1)}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Equipment;
