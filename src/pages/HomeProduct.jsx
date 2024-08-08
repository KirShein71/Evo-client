import React from 'react';
import HomeProductList from '../components/HomeProductList/HomeProductList';
import { Helmet } from 'react-helmet';

function HomeProduct() {
  return (
    <>
      <Helmet>
        <title>EVA коврики для дома</title>
        <meta
          name="description"
          content="На этой странице вы можете приобрести EVA коврики для дома"
        />
        <meta name="keywords" content="коврики для дома, EVA коврики для дома" />
      </Helmet>
      <HomeProductList />
    </>
  );
}

export default HomeProduct;
