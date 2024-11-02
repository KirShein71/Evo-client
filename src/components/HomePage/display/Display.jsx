import React from 'react';

import './style.scss';
import DisplayCard from './DisplayCard';

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
          </div>
          <DisplayCard />
        </div>
      </div>
    </div>
  );
}

export default Display;
