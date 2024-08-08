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
      </Helmet>
      <ConfidentialityList />
    </>
  );
}

export default Confidentiality;
