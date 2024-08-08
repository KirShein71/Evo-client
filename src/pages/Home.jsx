import React from 'react';
import HomeContent from '../components/HomeContent';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <>
      <Helmet>
        <title>Магазин Savaks|Автомобильные Eva-коврики и аксессуары</title>
        <meta
          name="description"
          content="Стильные и практичные EVA коврики для вашего авто: прочные, водонепроницаемые, легко моются. Доставка по всей стране!"
        />
        <meta
          name="keywords"
          content="savask, автомобильные коврики, коврики для автомобилей, автомобильные EVA-коврики, EVA коврики для автомобилей, EVA коврики для дома, EVA ковркии для животных"
        />
      </Helmet>
      <HomeContent />
    </>
  );
}

export default Home;
