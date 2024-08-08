import React from 'react';
import OneBrandCatalog from '../components/OneBrandCatalog/OneBrandCatalog';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

function OneBrand() {
  const location = useLocation();
  const originalName = location.state?.originalName;
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
      </Helmet>
      <OneBrandCatalog />
    </>
  );
}

export default OneBrand;
