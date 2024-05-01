import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <h5 className="footer__title">Savaks</h5>
        <div className="footer__menu">
          <div className="footer__item">Каталог</div>
          <div className="footer__item">О нас</div>
          <div className="footer__item">Доставка и оплата</div>
        </div>
        <div className="footer__menu">
          <div className="footer__item">Гарантии</div>
          <div className="footer__item">Полезная информация</div>
          <div className="footer__item">Контакты</div>
          <div className="footer__admin">
            <Link to="/login">
              <img src="./img/admin.png" alt="car" />
            </Link>
          </div>
        </div>
        <div className="footer__information"></div>
      </div>
    </div>
  );
}

export default Footer;
