import React from 'react';
import AboutList from '../components/AboutList/AboutList';
import { Helmet } from 'react-helmet';

function About() {
  return (
    <>
      <Helmet>
        <title>О нас</title>
        <meta
          name="description"
          content="Информация о нашей компании, прошлое, настоящие и будущие"
        />
        <meta property="og:title" content="О нас" />
        <meta
          property="og:description"
          content="Информация о нашей компании, прошлое, настоящие и будущие"
        />
        <meta property="og:url" content="https://www.savaks.ru/abouts" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <AboutList />
    </>
  );
}

export default About;
