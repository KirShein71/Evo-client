import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function CartEmpty() {
  return (
    <div className="cart-empty">
      <div className="cart-empty__content">
        <div className="cart-empty__title">Корзина пуста</div>
        <div className="cart-empty__subtitle">Но это никогда не поздно исправить :)</div>
        <Link to="/allbrands">
          <button className="cart-empty__button">В каталог товаров</button>
        </Link>
      </div>
    </div>
  );
}

export default CartEmpty;
