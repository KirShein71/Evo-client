import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';

import './style.scss';

function Benefits() {
  const benefitsLeft = [
    {
      title:
        'Собственное производство позволяет контролировать весь процесс — от разработки до изготовления.',
    },
    {
      title: 'Мы предлагаем одни из самых низких цен на рынке.',
    },
    {
      title:
        'Широкий ассортимент EVA-ковриков, подходящих для большинства марок и моделей автомобилей.',
    },
    {
      title: 'Мы используем только высококачественные и безопасные материалы.',
    },
    {
      title: 'Доставка по всей России.',
    },
  ];

  const benefitsRight = [
    {
      title: ' Гарантия 12 месяцев.',
    },
    {
      title: 'Более 5 лет на рынке.',
    },
    {
      title:
        'Современное оборудование позволяет производить коврики с высокой точностью и качеством.',
    },
    {
      title:
        'Наша команда состоит из опытных специалистов, что обеспечивает высокий уровень обслуживания и профессионализм на всех этапах — от производства до продаж.',
    },
    {
      title: 'Тысячи довольных покупателей.',
    },
  ];

  const benefitsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const benefitsRightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const isMobile = window.innerWidth < 490;

  return (
    <div className="benefits" id="benefits">
      <div className="container">
        <h2 className="benefits__title">Почему выберают нас</h2>
        <div className="benefits-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={
              isMobile
                ? { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
                : benefitsVariants
            }
            transition={{ duration: 0.5 }}>
            {benefitsLeft.map((itemLeft) => (
              <div className="benefits__item" key={itemLeft.id}>
                <div className="benefits__icon">
                  <CheckCircleOutlineIcon sx={{ fontSize: 45, color: '#ffffff' }} />
                </div>
                <div className="benefits__text">{itemLeft.title}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="benefits-right">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={
              isMobile
                ? { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
                : benefitsRightVariants
            }
            transition={{ duration: 0.5 }}>
            {benefitsRight.map((itemRight) => (
              <div className="benefits__item">
                <div className="benefits__icon">
                  <CheckCircleOutlineIcon sx={{ fontSize: 45, color: '#ffffff' }} />
                </div>
                <div className="benefits__text">{itemRight.title}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
