import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function FavoriteEmpty() {
  return (
    <div className="favorite-empty">
      <div className="favorite-empty__content">
        <div className="favorite-empty__title">Здесь ничего нет</div>
        <div className="favorite-empty__subtitle">Но это никогда не поздно исправить :)</div>
        <Link to="/allbrands">
          <button className="favorite-empty__button">В каталог товаров</button>
        </Link>
      </div>
    </div>
  );
}

export default FavoriteEmpty;
