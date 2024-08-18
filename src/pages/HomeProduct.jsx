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
        <meta property="og:title" content="EVA коврики для дома" />
        <meta
          property="og:description"
          content="На этой странице вы можете приобрести EVA коврики для дома"
        />
        <meta property="og:url" content="https://www.savaks.ru/homeproduct" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <HomeProductList />
    </>
  );
}

export default HomeProduct;
