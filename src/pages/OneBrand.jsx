import React from 'react';
import OneBrandCatalog from '../components/OneBrandCatalog/OneBrandCatalog';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

function OneBrand() {
  const { originalName } = useParams();
  return (
    <>
      <Helmet>
        <title>Коврики EVA для {originalName}</title>
        <meta
          name="description"
          content="Вы можете приобрести автомобильные EVA коврики для вашего автомобиля"
        />
        <meta
          name="keywords"
          content="автомобильные коврики, коврики для автомобилей, автомобильные коврики EVA"
        />
        <meta property="og:title" content="Коврики EVA для вашего автомобиля" />
        <meta
          property="og:description"
          content="Вы можете приобрести автомобильные EVA коврики для вашего автомобиля"
        />
        <meta property="og:url" content={`https://www.savaks.ru/onebrand/${originalName}`} />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <OneBrandCatalog />
    </>
  );
}

export default OneBrand;
