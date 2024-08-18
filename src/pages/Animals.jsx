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
        <meta property="og:title" content="EVA коврики для домашних животных" />
        <meta
          property="og:description"
          content="Широкий выбор EVA ковриков для домашних животных"
        />
        <meta property="og:url" content="https://www.savaks.ru/animals" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <AnimalsList />
    </>
  );
}

export default Animals;
