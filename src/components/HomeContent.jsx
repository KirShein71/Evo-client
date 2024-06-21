import React from 'react';
import Promo from './Promo/Promo';
import Sale from './Sale/Sale';
import Image from './Image/Image';
import Video from './VideoPlayer/Video';
import SearchSection from './SearchSection/SearchSection';

function HomeContent() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Video />
      <SearchSection />
      <Promo />
      <Sale />
      <Image />
    </>
  );
}

export default HomeContent;
