import React from 'react';
import { deleteSteel } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function SteelTable({ steel, id, change, setChange }) {
  const [openDeleteSteelModal, setOpenDeleteSteelModal] = React.useState(false);

  const handleRemoveSteel = (id) => {
    deleteSteel(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteSteelModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenSteelDeleteModal = () => {
    setOpenDeleteSteelModal(true);
  };

  const handleCloseSteelDeleteModal = () => {
    setOpenDeleteSteelModal(false);
  };

  return (
    <>
      <td>
        {' '}
        <div className="baskettable__image">
          <img
            className="baskettable__image-steel"
            src={process.env.REACT_APP_IMG_URL + steel?.image}
            alt="saddle__image"
          />
        </div>
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">{steel.name}</div>
        </div>
      </td>
      <td>
        <div className="baskettable__quantity">1</div>
      </td>
      <td>
        <div className="baskettable__price">{steel.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">{steel.new_price}</div>
      </td>
      <td>
        {openDeleteSteelModal && (
          <ModalBasket
            remove={handleRemoveSteel}
            id={id}
            handleCloseDeleteModal={handleCloseSteelDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenSteelDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default SteelTable;
