import React from 'react';
import './style.scss';

function BagImage({ bag, selectedBagmaterialId, selectedBagSize }) {
  return (
    <div className="bagimage">
      <div className="bagimage__content">
        <div className="bagimage__image">
          {bag.bag_images?.map((bagImage) => {
            return (
              <>
                <div
                  key={bagImage.id}
                  style={{
                    display:
                      bagImage.bagmaterialId === selectedBagmaterialId &&
                      bagImage.bagsizeId === selectedBagSize
                        ? 'block'
                        : 'none',
                  }}>
                  <img src={process.env.REACT_APP_IMG_URL + bagImage.image} alt="image bag" />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BagImage;
