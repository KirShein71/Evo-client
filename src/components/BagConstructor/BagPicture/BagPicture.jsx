import React from 'react';
import ModalPicture from './ModalPicture';
import './style.scss';

function BagPicture({ bag, selectedBagmaterialId, selectedBagSize }) {
  const [openModalPicture, setOpenModalPicture] = React.useState(false);
  const [selectedPictures, setSelectedPictures] = React.useState([]);

  const handleClickPicture = () => {
    const filteredPictures = bag.bag_pictures.filter(
      (pictureItem) =>
        pictureItem.bagmaterialId === selectedBagmaterialId &&
        pictureItem.bagsizeId === selectedBagSize,
    );
    setSelectedPictures(filteredPictures);
    setOpenModalPicture(true);
  };

  const closedPictureModal = () => {
    setOpenModalPicture(false);
  };

  return (
    <div className="bagpicture">
      <div className="bagpicture__content">
        <div className="bagpicture__image">
          {bag.bag_pictures?.map((bagPicture) => {
            return (
              <>
                <div
                  key={bagPicture.id}
                  style={{
                    display:
                      bagPicture.bagmaterialId === selectedBagmaterialId &&
                      bagPicture.bagsizeId === selectedBagSize
                        ? 'block'
                        : 'none',
                  }}>
                  <img
                    src={process.env.REACT_APP_IMG_URL + bagPicture.image}
                    alt="bag"
                    onClick={() => handleClickPicture(bagPicture.image)}
                  />
                </div>
              </>
            );
          })}
        </div>
        {openModalPicture && (
          <ModalPicture
            closedPictureModal={closedPictureModal}
            selectedPictures={selectedPictures}
          />
        )}
      </div>
    </div>
  );
}

export default BagPicture;
