import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__title">
          <Link to="/">
            <img src={`/img/savaks (1) (1).png?v=${Date.now()}`} alt="logo" />
          </Link>
        </div>
        <div className="footer__menu">
          <Link to="/allbrands">
            <div className="footer__item">Автомобильные коврики</div>
          </Link>
          <Link to="/homeproduct">
            <div className="footer__item">Коврики для дома</div>
          </Link>
          <Link to="/animals">
            <div className="footer__item">Коврики для животных</div>
          </Link>
        </div>
        <div className="footer__menu">
          <Link to="/about">
            <div className="footer__item">О нас</div>
          </Link>
          <Link to="/guarantees">
            <div className="footer__item">Гарантии</div>
          </Link>
          <Link to="/contacts">
            <div className="footer__item">Контакты</div>
          </Link>
          <div className="footer__admin">
            <Link to="/login">
              <img src={`/img/admin.png?v=${Date.now()}`} alt="car" />
            </Link>
          </div>
          <a
            href="https://wa.me/79112142878"
            class="whatsapp_float"
            target="_blank"
            rel="noopener noreferrer">
            <i class="fa fa-whatsapp whatsapp-icon"></i>
          </a>
        </div>
        <div className="footer__information"></div>
      </div>
    </footer>
  );
}

export default Footer;
