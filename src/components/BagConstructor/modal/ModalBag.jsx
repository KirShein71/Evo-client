import React from 'react';
import './style.scss';

function ModalBag({ onClosePopup }) {
  return (
    <div className="overlay__modalbag">
      <div className="modalbag">
        <p className="modalbag__text">Вы не выбрали размер органайзера</p>
        <button onClick={onClosePopup} className="modalbag__button">
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalBag;
