import React from 'react';
import DisplayCard from './DisplayCard';
import './style.scss';

function Display() {
  return (
    <div className="display">
      <div className="container">
        <div className="display__content">
          <div className="display__information">
            <h1 className="display__information-title">
              EVA-коврики для всех автомобилей напрямую от производителя
            </h1>
            <h3 className="display__information-delivery">
              Доставка по всей России удобным для Вас способом
            </h3>
            <DisplayCard />
          </div>
          <div className="display__image">
            {' '}
            <img src="../img/rug-display.png" alt="car mat" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
