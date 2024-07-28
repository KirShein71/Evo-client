import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Notfound() {
  return (
    <div className="notfound">
      <div className="notfound__content">
        <div className="notfound__title">Страница не найдена </div>
        <Link to="/">
          <button div className="notfound__button">
            Перейти на главную
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Notfound;
