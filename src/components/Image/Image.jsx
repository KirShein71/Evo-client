import React from 'react';
import './style.scss';

function Image() {
  return (
    <div className="image">
      <div className="container">
        <div className="image__title">Фотографии наших работ</div>
        <div className="image__content">
          <div className="image__img">
            <img src="./img/img1.png" alt="photo_works" />
          </div>
          <div className="image__img">
            <img src="./img/img2.png" alt="photo_works" />
          </div>
          <div className="image__img">
            <img src="./img/img3.png" alt="photo_works" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
