import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ModalPicture({ closedPictureModal, selectedPictures }) {
  const [sliderRef, setSliderRef] = React.useState(null);

  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
  };

  return (
    <div className="overlay__modalpicture">
      <div className="modalpicture">
        <div className="modalpicture__close">
          <ClearIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={closedPictureModal} />
        </div>
        <div className="modalpicture__content">
          <div className="modalpicture__arrow" onClick={() => sliderRef?.slickPrev()}>
            <img src="../img/left.png" alt="arrow_left" />
          </div>
          <div className="modalpicture__image">
            <Slider ref={setSliderRef} {...settings}>
              {selectedPictures.map((picture) => (
                <img src={process.env.REACT_APP_IMG_URL + picture.image} alt="bag rug" />
              ))}
            </Slider>
          </div>
          <div className="modalpicture__arrow" onClick={() => sliderRef?.slickNext()}>
            <img src="../img/right.png" alt="arrow_right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPicture;
