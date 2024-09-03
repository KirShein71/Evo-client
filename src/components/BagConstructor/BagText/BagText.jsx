import React from 'react';
import './style.scss';

function BagText() {
  return (
    <div className="bagtext">
      <div className="bagtext__content">
        <div className="bagtext__items">
          <p className="bagtext__item">
            <span>Просторное хранение:</span> Удобные отделения и карманы помогут разместить все
            необходимое: инструменты, аптечку, продукты, спортивное оборудование, детские вещи и
            многое другое.{' '}
          </p>
          <p className="bagtext__item">
            <span>Прочность и износостойкость:</span> Изготовлен из высококачественных материалов,
            устойчивых к нагрузкам и истиранию.
          </p>
          <p className="bagtext__item">
            <span>Универсальный размер:</span> Подойдет для большинства автомобилей.
          </p>
          <p className="bagtext__item">
            <span>Стильный дизайн:</span> Сочетает функциональность и эстетику, не нарушая общий вид
            вашего автомобиля.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BagText;
