import React from 'react';
import AnimalsList from '../components/AnimalsList/AnimalsList';
import { Helmet } from 'react-helmet';

function Animals() {
  return (
    <>
      <Helmet>
        <title>EVA коврики для домашних животных</title>
        <meta name="description" content="Широкий выбор EVA ковриков для домашних животных" />
        <meta name="keywords" content="коврики, коврики для животных, EVA коврики для животных" />
      </Helmet>
      <AnimalsList />
    </>
  );
}

export default Animals;
