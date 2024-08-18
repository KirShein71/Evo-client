import React from 'react';
import Favorite from '../components/Favorite/Favorite';
import { Helmet } from 'react-helmet';

function Favorites() {
  return (
    <>
      <Helmet>
        <title>Избранные товары</title>
        <meta
          name="description"
          content="Добро пожаловать в раздел Избранные товары! Здесь вы найдете тщательно отобранные продукты, которые мы рекомендуем для вас. Эти товары выделяются своим качеством, популярностью и уникальными характеристиками. Откройте для себя лучшие предложения и новинки, которые помогут сделать вашу жизнь ярче и удобнее. Не упустите шанс приобрести то, что действительно стоит вашего внимания!"
        />
        <meta
          name="keywords"
          content="автомобильные коврики, автомобильные EVA-коврики, коврики для автомобилей, EVA коврики для автомобилей"
        />
        <meta property="og:title" content="Избранные товары" />
        <meta
          property="og:description"
          content="Добро пожаловать в раздел Избранные товары! Здесь вы найдете тщательно отобранные продукты, которые мы рекомендуем для вас. Эти товары выделяются своим качеством, популярностью и уникальными характеристиками. Откройте для себя лучшие предложения и новинки, которые помогут сделать вашу жизнь ярче и удобнее. Не упустите шанс приобрести то, что действительно стоит вашего внимания!"
        />
        <meta property="og:url" content="https://www.savaks.ru/favorites" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Favorite />
    </>
  );
}

export default Favorites;
