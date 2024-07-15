import React from 'react';
import './style.scss';

function Cellshape() {
  return (
    <div className="cellshape">
      <div className="cellshape__title">Форма ячейки</div>
      <div className="cellchape__content">
        <div className="cellshape__image">
          <img src="../img/sota.png" alt="cellshape__rug" />
          <div className="cellshape__subtitle">Сота</div>
        </div>
      </div>
    </div>
  );
}

export default Cellshape;
