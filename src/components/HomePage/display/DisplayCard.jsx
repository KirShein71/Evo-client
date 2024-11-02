import React from 'react';

function DisplayCard() {
  return (
    <div>
      <div className="display-card">
        <div className="display-card__content">
          <h3 className="display-card__title">Получите скидку от 600 рублей</h3>
          <div className="display-card__inputs">
            <input className="display-card__number" placeholder="Ваш телефон" />
            <div className="display-card__brand">Audi</div>
            <div className="display-card__model">Q7 2024-2026</div>
          </div>
          <button className="display-card__button">Получить скидку</button>
        </div>
        <img className="image" src="../img/result (1).png" />
      </div>
    </div>
  );
}

export default DisplayCard;
