import React from 'react';
import { Link } from 'react-router-dom';
import YMap from './YMap';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import './style.scss';

function ContactList() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contactlist">
      <div className="contactlist__crumbs">
        <div className="container">
          <div className="contactlist__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="contactlist__crumbs-item">Главная</div>
            </Link>
            <div className="contaclist__crumbs-icon">
              <ArrowRightAltIcon sx={{ color: '#ffffff', fontSize: 28 }} />
            </div>
            <div className="contactlist__crumbs-item__active">Контакты</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="contactlist__content">
          <div className="contactlist__information">
            <h1 className="contactlist__title">Контакты</h1>
            <div className="contactlist__information-item">
              <div className="contactlist__information-item__icon">
                <LocationOnIcon sx={{ color: '#ffffff' }} />
              </div>
              <div className="contactlist__information-item__text">Санкт-Петербург, Боровая 51</div>
            </div>
            <div className="contactlist__information-item">
              <div className="contactlist__information-item__icon">
                <AccessTimeIcon sx={{ color: '#ffffff' }} />
              </div>
              <div className="contactlist__information-item__text">Пн-Вс 10:00 - 20:00</div>
            </div>

            <div className="contactlist__information-item">
              <div className="contactlist__information-item__icon">
                <PhoneInTalkOutlinedIcon sx={{ color: '#ffffff' }} />
              </div>
              <a className="contactlist__phone" href="tel:89112142878">
                8 911 214 28 78
              </a>
            </div>
          </div>
          <div className="contactlist__map">
            <YMap />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
