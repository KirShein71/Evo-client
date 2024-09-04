import React from 'react';
import './style.scss';

function BagMaterial({
  bagmaterials,
  selectedBagmaterialName,
  setSelectedBagmaterial,
  selectedBagmaterial,
  setSelectedBagmaterialName,
  setSelectedBagmaterialId,
}) {
  return (
    <div className="bag-materials">
      <div className="bag-materials__title">Цвет материала: {selectedBagmaterialName}</div>
      <div className="bag-materials__content">
        {bagmaterials.map((bagmaterial) => (
          <div
            key={bagmaterial.id}
            onClick={() => {
              setSelectedBagmaterial(bagmaterial.color);
              setSelectedBagmaterialName(bagmaterial.name);
              setSelectedBagmaterialId(bagmaterial.id);
            }}>
            <div
              className={`bag-materials__content-item ${bagmaterial.color} ${
                selectedBagmaterial === bagmaterial.color ? 'active' : ''
              }`}
              style={{ backgroundColor: bagmaterial.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BagMaterial;
