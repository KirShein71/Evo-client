import React from 'react';
import './style.scss';

function ModalCheckout({ onClosePopup }) {
  return (
    <div className="overlay__modalcheckout">
      <div className="modalcheckout">
        <p className="modalcheckout__text">
          Вы не потвердили свое согласие на обработку персональных данных
        </p>
        <button onClick={onClosePopup} className="modalcheckout__button">
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalCheckout;
