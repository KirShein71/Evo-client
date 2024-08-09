import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

function ModalImage({ closedImageModal, image }) {
  return (
    <div className="overlay__modalimage">
      <div className="modalimage">
        <div className="modalimage__close">
          <ClearIcon fontSize="large" onClick={closedImageModal} />
        </div>
        <div className="modalimage__content">
          <div className="modalimage__image">
            <img src={process.env.REACT_APP_IMG_URL + image} alt="home rug" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalImage;
