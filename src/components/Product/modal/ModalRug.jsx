import React from 'react';
import './style.scss';

function ModalRug({ onClosePopup }) {
  return (
    <div className="overlay__modalrug">
      <div className="modalrug">
        <p className="modalrug__text">Вы не выбрали коврик</p>
        <button onClick={onClosePopup} className="modalrug__button">
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalRug;
