import React from 'react';
import YMap from './YMap';
import './style.scss';

function ContactList() {
  return (
    <div className="contactlist">
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
              Режим работы: <span>Пн-Вск 09:00 - 18:00</span>
            </div>
            <div className="contactlist__information-item">
              Телефон:
              <a className="contactlist__phone" href="tel:+79618080539">
                8-961-808-0539
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
