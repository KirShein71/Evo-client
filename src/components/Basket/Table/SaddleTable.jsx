import React from 'react';
import { deleteSaddle } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function SaddleTable({ saddle, id, change, setChange }) {
  const [openDeleteSaddleModal, setOpenDeleteSaddleModal] = React.useState(false);

  const handleRemoveSaddle = (id) => {
    deleteSaddle(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteSaddleModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenSaddleDeleteModal = () => {
    setOpenDeleteSaddleModal(true);
  };

  const handleCloseSaddleDeleteModal = () => {
    setOpenDeleteSaddleModal(false);
  };

  return (
    <>
      <td>
        {' '}
        <div className="baskettable__image">
          <img
            className="baskettable__image-saddle"
            src={process.env.REACT_APP_IMG_URL + saddle?.image}
            alt="saddle__image"
          />
        </div>
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">{saddle.name}</div>
        </div>
        <td>
          <div className="baskettable__information-price">Цена: {saddle.new_price}</div>
        </td>
      </td>
      <td>
        <div className="baskettable__quantity">1</div>
      </td>
      <td>
        <div className="baskettable__price">{saddle.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">{saddle.new_price}</div>
      </td>
      <td>
        {openDeleteSaddleModal && (
          <ModalBasket
            remove={handleRemoveSaddle}
            id={id}
            handleCloseDeleteModal={handleCloseSaddleDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenSaddleDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default SaddleTable;
