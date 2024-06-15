import React from 'react';
import CarouselSlider from './CarouselSlider';
import Promo from './Promo/Promo';
import Sale from './Sale/Sale';
import Image from './Image/Image';
import Video from './VideoPlayer/Video';

function HomeContent() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Video />
      <Promo />
      <Sale />
      <Image />
    </>
  );
}

export default HomeContent;
