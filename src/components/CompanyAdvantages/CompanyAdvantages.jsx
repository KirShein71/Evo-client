import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import './style.scss';

function CompanyAdvantages() {
  const items = [
    {
      title: 'Доставка по всей России',
      text: 'Мы предлагаем удобную доставку по всей России, чтобы каждый клиент мог получить качественные автомобильные коврики прямо к своему дому. Независимо от вашего местоположения, мы обеспечим быструю и надежную доставку.',
      icon: <LocalShippingIcon color="primary" fontSize="large" />,
    },
    {
      title: 'Собственное производство',
      text: 'Наши автомобильные коврики производятся непосредственно на нашем собственном производстве, что гарантирует высокое качество и контроль каждого этапа производства. Мы стремимся к совершенству в каждой детали',
      icon: <FactoryIcon color="primary" fontSize="large" />,
    },
    {
      title: 'Широкий выбор',
      text: 'У нас вы найдете огромный выбор автомобильных ковриков различных размеров, цветов и материалов. Независимо от ваших предпочтений, у нас есть идеальное решение для вашего автомобиля, чтобы подчеркнуть его стиль и защитить пол.',
      icon: <CardGiftcardIcon color="primary" fontSize="large" />,
    },
  ];
  return (
    <div className="companyadvantages">
      <div className="container">
        <div className="companyadvantages__content">
          {items.map((item) => (
            <div key={item.id} className="companyadvantages__card">
              <div className="companyadvantages__card-icon">{item.icon}</div>
              <h5 className="companyadvantages__card-title">{item.title}</h5>
              <p className="companyadvantages__card-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyAdvantages;
