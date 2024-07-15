import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import './style.scss';

function Track() {
  const carBrands = [
    'Toyota',
    'Honda',
    'Ford',
    'BMW',
    'Mercedes',
    'Audi',
    'Lada',
    'Gaz',
    'Kia',
    'Haval',
  ];
  return (
    <div className="track">
      <div className="track__content">
        <Swiper
          className="sample-slider"
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 0 }}
          slidesPerView={7} // added
          speed={3000} // added
        >
          {carBrands.map((brand) => (
            <SwiperSlide>
              <div key={brand.id} className="track__title">
                {brand}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Track;
