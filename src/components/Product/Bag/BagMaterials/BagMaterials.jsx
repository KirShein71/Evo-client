import React from 'react';
import './style.scss';

function BagMaterials({
  bagmaterials,
  selectedBagmaterialName,
  setSelectedBagmaterial,
  selectedBagmaterial,
  setSelectedBagmaterialName,
  setSelectedBagmaterialId,
}) {
  return (
    <div className="bagmaterials">
      <div className="bagmaterials__title">Цвет материала: {selectedBagmaterialName}</div>
      <div className="bagmaterials__content">
        {bagmaterials.map((bagmaterial) => (
          <div
            key={bagmaterial.id}
            onClick={() => {
              setSelectedBagmaterial(bagmaterial.color);
              setSelectedBagmaterialName(bagmaterial.name);
              setSelectedBagmaterialId(bagmaterial.id);
            }}>
            <div
              className={`materials__content-item ${bagmaterial.color} ${
                selectedBagmaterial === bagmaterial.color ? 'active' : ''
              }`}
              style={{ backgroundColor: bagmaterial.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BagMaterials;
