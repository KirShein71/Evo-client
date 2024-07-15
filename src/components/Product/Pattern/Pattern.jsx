import React from 'react';
import './style.scss';

function Pattern({
  product,
  isSecondrowChecked,
  isThirdrowChecked,
  thirdrow,
  trunk,
  selectedProductTrunk,
}) {
  return (
    <div className="pattern">
      <div className="pattern__content">
        <div className="pattern__car">
          <div className="pattern__car-image">
            <img src={process.env.REACT_APP_IMG_URL + product.image} alt="car mat" />
          </div>
        </div>
        <div className="pattern__schema">
          <div className="pattern__schema-image">
            {isSecondrowChecked && product.pattern_image !== null && (
              <img src={process.env.REACT_APP_IMG_URL + product.pattern_image} alt="car mat" />
            )}
            {isThirdrowChecked &&
              thirdrow.map((thirdrowImage) => (
                <div key={thirdrowImage.id}>
                  <img src={process.env.REACT_APP_IMG_URL + thirdrowImage.image} alt="schema" />
                </div>
              ))}
          </div>
          <div className="pattern__schema-text">Образец лекал на:</div>
          <div className="pattern__schema-text__bottom">{product.name}</div>
        </div>
        {selectedProductTrunk ? (
          <div className="pattern__trunk">
            <div
              key={selectedProductTrunk}
              className="pattern__trunk-image"
              style={{
                opacity: 1,
                transition: 'opacity 0.3s ease-in-out',
              }}>
              <img
                src={
                  process.env.REACT_APP_IMG_URL +
                  trunk.find((item) => item.id === selectedProductTrunk)?.image
                }
                alt="schema trunk mat"
              />
            </div>
            <div className="pattern__trunk-text">Образец лекал в багажник</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Pattern;
