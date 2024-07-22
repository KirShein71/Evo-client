import React from 'react';
import './style.scss';

function ModalData({ onClosePopup }) {
  return (
    <div className="overlay__modalcheckout">
      <div className="modalcheckout">
        <p className="modalcheckout__text">Вы не внесли свои данные</p>
        <button onClick={onClosePopup} className="modalcheckout__button">
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalData;
