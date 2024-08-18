import React from 'react';
import ConfidentialityList from '../components/Confidentiality/ConfidentialityList';
import { Helmet } from 'react-helmet';

function Confidentiality() {
  return (
    <>
      <Helmet>
        <title>Страница обработки персональных данных</title>
        <meta
          name="description"
          content="Внимательно ознакомтесь с политикой по работе с персональными данными"
        />
        <meta property="og:title" content="Страница обработки персональных данных" />
        <meta
          property="og:description"
          content="Внимательно ознакомтесь с политикой по работе с персональными данными "
        />
        <meta property="og:url" content="https://www.savaks.ru/confidentiality" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ConfidentialityList />
    </>
  );
}

export default Confidentiality;
