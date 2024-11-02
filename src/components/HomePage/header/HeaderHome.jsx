import React from 'react';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import './style.scss';

function HeaderHome() {
  return (
    <div className="header-home">
      <div className="container">
        <div className="header-home__bar">
          <div className="header-home__bar-icon">SAVAKS</div>
          <ul className="header-home__bar-items">
            <li className="header-home__bar-item">EVA коврики</li>
            <li className="header-home__bar-item">Автоаксессуары</li>
            <li className="header-home__bar-item">Для дома</li>
            <li className="header-home__bar-item">О нас</li>
            <li className="header-home__bar-item">Отзывы</li>
            <li className="header-home__bar-item">Контакты</li>
          </ul>
          <div className="header-home__bar-phone">
            <div className="header-home__bar-phoneIcon">
              <PhoneInTalkOutlinedIcon sx={{ color: '#ffffff', fontSize: 30 }} />
            </div>
            <div className="header-home__bar-talk">
              <a className="header-home__bar-number" href="tel:89112142878">
                8-911-214-28-78
              </a>
              <p className="header-home__bar-text">Звонок бесплатный</p>
            </div>
          </div>
          <div className="header-home__bar-icons">
            <div className="header-home__favorite">
              <FavoriteBorderOutlinedIcon sx={{ color: '#ffffff', fontSize: 30 }} />
            </div>
            <div className="header-home__basket">
              <ShoppingCartOutlinedIcon sx={{ color: '#ffffff', fontSize: 30 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
