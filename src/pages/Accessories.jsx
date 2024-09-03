import React from 'react';
import AccessoriesList from '../components/AccessoriesList/AccessoriesList';
import { Helmet } from 'react-helmet';

function Accessories() {
  return (
    <>
      <Helmet>
        <title>Автоаксессуары</title>
        <meta name="description" content="Широкий выбор автоаксессуаров для вашего автомобиля" />
        <meta property="og:title" content="О нас" />
        <meta
          property="og:description"
          content="Широкий выбор автоаксессуаров для вашего автомобиля"
        />
        <meta property="og:url" content="https://www.savaks.ru/accessories" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <AccessoriesList />
    </>
  );
}

export default Accessories;
