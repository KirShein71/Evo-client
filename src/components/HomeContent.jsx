import React from 'react';
import Promo from './Promo/Promo';
import Sale from './Sale/Sale';
import Image from './Image/Image';
import Video from './VideoPlayer/Video';
import SearchSection from './SearchSection/SearchSection';
import CarouselSlider from './CarouselSlider';
import Cdek from './Cdek/Cdek';

function HomeContent() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 600 ? <CarouselSlider /> : <Video />};
      <SearchSection />
      <Promo />
      <Sale />
      <Image />
      <Cdek />
    </>
  );
}

export default HomeContent;
