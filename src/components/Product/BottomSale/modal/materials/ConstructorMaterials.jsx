import React from 'react';
import './style.scss';

function ConsrtuctorMaterials({
  bagmaterials,
  selectedBagmaterialName,
  setSelectedBagmaterial,
  selectedBagmaterial,
  setSelectedBagmaterialName,
  setSelectedBagmaterialId,
}) {
  return (
    <div className="constructor-materials">
      <div className="constructor-materials__title">Цвет материала: {selectedBagmaterialName}</div>
      <div className="constructor-materials__content">
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

export default ConsrtuctorMaterials;
