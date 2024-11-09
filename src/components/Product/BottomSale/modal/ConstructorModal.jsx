import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import './style.scss';
import ConsrtuctorMaterials from './materials/ConstructorMaterials';

function ConstructorModal({
  closed,
  bags,
  id,
  bagmaterials,
  selectedBagmaterialName,
  setSelectedBagmaterial,
  selectedBagmaterial,
  setSelectedBagmaterialName,
  setSelectedBagmaterialId,
}) {
  return (
    <div className="overlay__construcor-modal">
      <div className="constructor-modal">
        <div className="constructor-modal__close">
          <ClearIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={closed} />
        </div>
        {bags
          .filter((bag) => bag.id === id)
          .map((bag) => (
            <>
              <h4 className="constructor-modal__title">{bag.name}</h4>
              <div className="consturctor-mdal__content">
                <ConsrtuctorMaterials
                  bagmaterials={bagmaterials}
                  selectedBagmaterialName={selectedBagmaterialName}
                  setSelectedBagmaterial={setSelectedBagmaterial}
                  selectedBagmaterial={selectedBagmaterial}
                  setSelectedBagmaterialName={setSelectedBagmaterialName}
                  setSelectedBagmaterialId={setSelectedBagmaterialId}
                />
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default ConstructorModal;
