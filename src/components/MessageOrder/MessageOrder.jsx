import React from 'react';
import './style.scss';

function MessageOrder() {
  return (
    <div className="message">
      <div className="container">
        <div className="message__content">
          <div className="message__title">Заказ оформлен</div>
          <div className="message__text">Наш менеджер скоро позвонит для уточнения деталей.</div>
        </div>
      </div>
    </div>
  );
}

export default MessageOrder;
