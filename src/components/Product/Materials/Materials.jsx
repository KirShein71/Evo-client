import React from 'react';
import './style.scss';

function Materials({
  materials,
  selectedMaterialName,
  setSelectedMaterial,
  selectedMaterial,
  setSelectedMaterialName,
  setSelectedMaterialId,
}) {
  return (
    <div className="materials">
      <div className="materials__title">Цвет материала: {selectedMaterialName}</div>
      <div className="materials__content">
        {materials.map((material) => (
          <div
            key={material.id}
            onClick={() => {
              setSelectedMaterial(material.color);
              setSelectedMaterialName(material.name);
              setSelectedMaterialId(material.id);
            }}>
            <div
              className={`materials__content-item ${material.color} ${
                selectedMaterial === material.color ? 'active' : ''
              }`}
              style={{ backgroundColor: material.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materials;
