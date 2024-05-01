import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar__content">
        <Link to="/">
          <div className="navbar__items">Главная</div>
        </Link>
        <Link to="/allbrands">
          <div className="navbar__items">Каталог</div>
        </Link>
        <div className="navbar__items">О нас</div>
        <div className="navbar__items">Доставка и оплата</div>
        <div className="navbar__items">Гарантии</div>
        <div className="navbar__items">Полезная информация</div>
        <div className="navbar__items">Контакты</div>
      </div>
    </div>
  );
}

export default NavBar;
