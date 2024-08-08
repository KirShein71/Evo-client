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
          content="Информация о нашей компании, прошлое, настоящие и будующие"
        />
      </Helmet>
      <AboutList />
    </>
  );
}

export default About;
