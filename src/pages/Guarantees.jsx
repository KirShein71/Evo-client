import React from 'react';
import GuaranteesList from '../components/Guarantees/GuaranteesList';
import { Helmet } from 'react-helmet';

function Guarantees() {
  return (
    <>
      <Helmet>
        <title>Гарантия</title>
        <meta
          name="description"
          content="Мы заботимся о вашем спокойствии! Все наши товары проходят строгий контроль качества, и мы уверены в их надежности. Узнайте о гарантийных сроках и условиях для каждого товара, а также о том, как воспользоваться гарантией, на этой странице."
        />
        <meta name="keywords" content="гарантии, качество товаров" />
        <meta property="og:title" content="Гарантия" />
        <meta
          property="og:description"
          content="Мы заботимся о вашем спокойствии! Все наши товары проходят строгий контроль качества, и мы уверены в их надежности. Узнайте о гарантийных сроках и условиях для каждого товара, а также о том, как воспользоваться гарантией, на этой странице."
        />
        <meta property="og:url" content="https://www.savaks.ru/guarantees" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <GuaranteesList />
    </>
  );
}

export default Guarantees;
