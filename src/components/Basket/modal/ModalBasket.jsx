import React from 'react';
import './style.scss';

function ModalBasket({ remove, id, handleCloseDeleteModal }) {
  return (
    <div className="overlay__modalbasket">
      <div className="modalbasket">
        <div className="modalbasket__content">
          <p className="modalbasket__text">Вы уверены, что хотите удалить товар?</p>
        </div>
        <div className="modalbasket__button">
          <button onClick={handleCloseDeleteModal} className="modalbasket__button-not">
            Отмена
          </button>
          <button onClick={() => remove(id)} className="modalbasket__button-yes">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBasket;
