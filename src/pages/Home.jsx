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
        <meta property="og:title" content="Магазин Savaks|Автомобильные Eva-коврики и аксессуары" />
        <meta
          property="og:description"
          content="Стильные и практичные EVA коврики для вашего авто: прочные, водонепроницаемые, легко моются. Доставка по всей стране!"
        />
        <meta property="og:url" content="https://www.savaks.ru/" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <HomeContent />
    </>
  );
}

export default Home;
