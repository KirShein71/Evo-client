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
      </Helmet>
      <CatalogBrands />
    </>
  );
}

export default AllBrands;
