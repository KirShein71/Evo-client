import React from 'react';
import CatalogBrands from '../components/CatalogBrands/CatalogBrands';
import { Helmet } from 'react-helmet';

function AllBrands() {
  return (
    <>
      <Helmet>
        <title>Каталог EVA ковриков по марке автомобиля</title>
        <meta
          name="description"
          content="На этой стринице представлены марки автомобилей к которым вы можете приобрести EVA коврики"
        />
        <meta name="keywords" content="марки автомобилей, бренды" />
        <meta property="og:title" content="Каталог EVA ковриков по марке автомобиля" />
        <meta
          property="og:description"
          content="На этой стринице представлены марки автомобилей к которым вы можете приобрести EVA коврики"
        />
        <meta property="og:url" content="https://www.savaks.ru/allbrands" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <CatalogBrands />
    </>
  );
}

export default AllBrands;
