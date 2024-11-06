import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { motion, useAnimation } from 'framer-motion';

import './style.scss';

function Advantages() {
  const controls = useAnimation();
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 700) {
      // Измените это значение по вашему усмотрению
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: -50, opacity: 0 }); // Начальная позиция выше экрана
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <div className="advantages">
      <div className="container">
        <motion.div
          initial={{ y: -50, opacity: 0 }} // Начальное состояние
          animate={controls}
          transition={{ duration: 1.5 }} // Длительность анимации
          className="advantages">
          <div className="advantages__content">
            <div className="advantages__card">
              <div className="advantages__card-icon">
                <LocalShippingIcon sx={{ color: '#ffffff' }} fontSize="large" />
              </div>
              <h5 className="advantages__card-title">Доставка по всей России</h5>
              <p className="advantages__card-text">
                Доставка по всей России удобным способом с оплатой при получении
              </p>
            </div>
            <div className="advantages__card">
              <div className="advantages__card-icon">
                <CardGiftcardIcon sx={{ color: '#ffffff' }} fontSize="large" />
              </div>
              <h5 className="advantages__card-title">Собственное производство</h5>
              <p className="advantages__card-text">
                У нас нет посредников. Вы покупаете товар без дополнительных наценок. И сможете
                сэкономить минимум от 2000 рублей на каждой позиции.<br></br> Сшили более 250 000
                ковриков. 10 лет на рынке. Гарантия 12 месяцев
              </p>
            </div>
            <div className="advantages__card">
              <div className="advantages__card-icon">
                <FactoryIcon sx={{ color: '#ffffff' }} fontSize="large" />
              </div>
              <h5 className="advantages__card-title">Широкий выбор</h5>
              <p className="advantages__card-text">
                У нас более 1000 ковриков. Каждый коврик в 4 цветах и вариациях
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Advantages;
