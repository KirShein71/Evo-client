import React from 'react';
import './style.scss';

function Carmat({ materials, edgings, selectedMaterial, selectedEdging }) {
  return (
    <div className="carmat">
      <div className="carmat__content">
        <div className="carmat__image">
          {materials.map((imageMaterial) => (
            <div
              key={imageMaterial.id}
              style={{
                display: imageMaterial.color === selectedMaterial ? 'block' : 'none',
              }}>
              <img
                className="image_one"
                src={process.env.REACT_APP_IMG_URL + imageMaterial.image}
                alt="car mat"
              />
            </div>
          ))}
          {edgings.map((imageEdging) => (
            <div
              key={imageEdging.id}
              style={{ display: imageEdging.color === selectedEdging ? 'block' : 'none' }}>
              <img
                className="image_two"
                src={process.env.REACT_APP_IMG_URL + imageEdging.image}
                alt="car mat"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carmat;
