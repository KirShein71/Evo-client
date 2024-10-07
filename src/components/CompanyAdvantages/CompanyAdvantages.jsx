import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import './style.scss';

function CompanyAdvantages() {
  const items = [
    {
      title: 'Доставка по всей России',
      text: 'Доставка по всей России удобным способом с оплатой при получении',
      icon: <LocalShippingIcon color="primary" fontSize="large" />,
    },
    {
      title: 'Собственное производство',
      text: 'У нас нет посредников. Вы покупаете товар без дополнительных наценок. И сможете сэкономить минимум от 2000 рублей на каждой позиции. Сшили более 250 000 ковриков. 10 лет на рынке',
      icon: <FactoryIcon color="primary" fontSize="large" />,
    },
    {
      title: 'Широкий выбор',
      text: 'У нас более 1000 ковриков. Каждый коврик в 4 цветах и вариациях',
      icon: <CardGiftcardIcon color="primary" fontSize="large" />,
    },
  ];
  return (
    <div className="companyadvantages">
      <div className="container">
        <div className="companyadvantages__content">
          <div className="companyadvantages__card">
            <div className="companyadvantages__card-icon">
              <LocalShippingIcon color="primary" fontSize="large" />
            </div>
            <h5 className="companyadvantages__card-title">Доставка по всей России</h5>
            <p className="companyadvantages__card-text">
              Доставка по всей России удобным способом с оплатой при получении
            </p>
          </div>
          <div className="companyadvantages__card">
            <div className="companyadvantages__card-icon">
              <CardGiftcardIcon color="primary" fontSize="large" />
            </div>
            <h5 className="companyadvantages__card-title">Собственное производство</h5>
            <p className="companyadvantages__card-text">
              У нас нет посредников. Вы покупаете товар без дополнительных наценок. И сможете
              сэкономить минимум от 2000 рублей на каждой позиции.<br></br> Сшили более 250 000
              ковриков. 10 лет на рынке. Гарантия 12 месяцев
            </p>
          </div>
          <div className="companyadvantages__card">
            <div className="companyadvantages__card-icon">
              <CardGiftcardIcon color="primary" fontSize="large" />
            </div>
            <h5 className="companyadvantages__card-title">Широкий выбор</h5>
            <p className="companyadvantages__card-text">
              У нас более 1000 ковриков. Каждый коврик в 4 цветах и вариациях
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyAdvantages;
