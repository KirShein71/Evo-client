import React from 'react';
import './style.scss';

function Edging({
  edgings,
  selectedEdging,
  setSelectedEdging,
  selectedEdgingName,
  setSelectedEdgingName,
  setSelectedEdgingId,
}) {
  return (
    <div className="edging">
      <div className="edging__title">Цвет канта: {selectedEdgingName}</div>
      <div className="edging__content">
        {edgings.map((edging) => (
          <div
            key={edging.id}
            onClick={() => {
              setSelectedEdging(edging.color);
              setSelectedEdgingName(edging.name);
              setSelectedEdgingId(edging.id);
            }}>
            <div
              className={`edging__content-item ${edging.color} ${
                selectedEdging === edging.color ? 'active' : ''
              }`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Edging;
