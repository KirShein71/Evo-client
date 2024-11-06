import React from 'react';
import Display from './Display/Display';
import Promo from './Promo/Promo';
import Advantages from './Advantages/Advantages';
import Feedback from './Feedback/Feedback';
import Benefits from './Benefits/Benefits';
import StepClient from './StepClient/StepClient';
import Reviews from './Reviews/Reviews';

function HomeContent() {
  return (
    <>
      <Display />
      <Promo />
      <Advantages />
      <Feedback />
      <Benefits />
      <StepClient />
      {/* <Reviews /> */}
    </>
  );
}

export default HomeContent;
