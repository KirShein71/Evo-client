import React from 'react';
import './style.scss';

function Burger({ toggleMenu }) {
  return (
    <div className="burger">
      <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
        <>
          <div className="burger__border"></div>
          <div className="burger__border"></div>
          <div className="burger__border"></div>
        </>
      </div>
    </div>
  );
}

export default Burger;
