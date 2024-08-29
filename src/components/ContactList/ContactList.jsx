import React from 'react';
import { Link } from 'react-router-dom';
import YMap from './YMap';
import './style.scss';

function ContactList() {
  return (
    <div className="contactlist">
      <div className="contactlist__crumbs">
        <div className="container">
          <div className="contactlist__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="contactlist__crumbs-item">Главная</div>
            </Link>
            <img className="contaclist__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            <div className="contactlist__crumbs-item__active">Контакты</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="contactlist__title">Контакты</div>
        <div className="contactlist__content">
          <div className="contactlist__map">
            <YMap />
          </div>
          <div className="contactlist__information">
            <div className="contactlist__information-item">
              Адрес: <span>Санкт-Петербург, Боровая 51</span>
            </div>
            <div className="contactlist__information-item">
              Режим работы: <span>Пн-Вс 09:00 - 18:00</span>
            </div>
            <div className="contactlist__information-item">
              Телефон:
              <a className="contactlist__phone" href="tel:8122202909">
                8-812-220-29-09
              </a>
            </div>
            <div className="contactlist__information-footnote">
              Обращаться только по предварительному звонку
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
