import React from 'react';
import './style.scss';

function ModalFeedback() {
  return (
    <div className="overlay__modalfeedback">
      <div className="modalfeedback">
        <h5 className="modalfeedback__title">Ваша заявка отправлена</h5>
        <p className="modalfeedback__text">Наши менеджеры свяжутся с вами в ближайшее время</p>
      </div>
    </div>
  );
}

export default ModalFeedback;
