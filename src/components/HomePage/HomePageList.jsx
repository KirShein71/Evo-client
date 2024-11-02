import React from 'react';
import HeaderHome from './header/HeaderHome';
import Display from './display/Display';
import Advantages from './advantages/Advantages';
import PromoCatalog from './catalog/PromoCatalog';
import FeedbackHome from './feedback/FeedBackHome';
import Benefits from './benefits/Benefits';
import Reviews from './reviews/Reviews';
import StepClient from './stepper/StepClient';

function HomePageList() {
  return (
    <div className="home-page">
      <HeaderHome />
      <Display />
      <PromoCatalog />
      <Advantages />
      <FeedbackHome />
      <Benefits />
      <StepClient />
      <Reviews />
    </div>
  );
}

export default HomePageList;
