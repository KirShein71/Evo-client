import React from 'react';
import CarouselSlider from './CarouselSlider';
import Promo from './Promo/Promo';
import Sale from './Sale/Sale';
import Image from './Image/Image';

function HomeContent() {
  return (
    <>
      <CarouselSlider />
      <Promo />
      <Sale />
      <Image />
    </>
  );
}

export default HomeContent;
