import React from 'react';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';

import './style.scss';

function StepClient() {
  return (
    <div className="step-client">
      <div className="container">
        <h4 className="step-client__title">Как заказать и получить товар</h4>
        <div className="step-client__content">
          <div className="step-client__item">
            <div className="step-client__item-icon">
              <LooksOneIcon sx={{ color: '#03142E', fontSize: 50 }} />
            </div>
            <p className="step-client__item-text">
              Оформляете заказ или оставляете заявку на сайте
            </p>
          </div>
          <div className="step-client__item">
            <div className="step-client__item-icon">
              <LooksTwoIcon sx={{ color: '#03142E', fontSize: 50 }} />
            </div>
            <p className="step-client__item-text">
              Наши менеджеры свяжутся с вами для уточнения детелей
            </p>
          </div>
          <div className="step-client__item">
            <div className="step-client__item-icon">
              <Looks3Icon sx={{ color: '#03142E', fontSize: 50 }} />
            </div>
            <p className="step-client__item-text">Доставляем заказ удобным для Вас способом</p>
          </div>
          <div className="step-client__item">
            <div className="step-client__item-icon">
              <Looks4Icon sx={{ color: '#03142E', fontSize: 50 }} />
            </div>
            <p className="step-client__item-text">
              Оплачиваете заказ после получения удобным для Вас способом
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepClient;
