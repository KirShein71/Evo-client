import React from 'react';
import { deleteTrunk } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function TrunkTable({ edging, material, trunk, quantity_trunk, id, change, setChange }) {
  const [openDeleteTrunkModal, setOpenDeleteTrunkModal] = React.useState(false);

  const handleRemoveTrunk = (id) => {
    deleteTrunk(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteTrunkModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenTrunkDeleteModal = () => {
    setOpenDeleteTrunkModal(true);
  };

  const handleCloseTrunkDeleteModal = () => {
    setOpenDeleteTrunkModal(false);
  };

  return (
    <>
      <td>
        {' '}
        <div className="baskettable__image">
          <img
            className="baskettable__image-edging"
            src={process.env.REACT_APP_IMG_URL + edging?.image}
            alt="edging__image"
          />
          <img
            className="baskettable__image-material"
            src={process.env.REACT_APP_IMG_URL + material?.image}
            alt="material__image"
          />
        </div>
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">
            Коврик в багажник для: {trunk.product.name}
          </div>
          <div className="baskettable__information-options">
            Форма ячейки: Сота, Цвет материала: {material.name}, Цвет канта: {edging.name}
          </div>
        </div>
        <td>
          <div className="baskettable__information-price">Цена: {trunk.new_price}</div>
        </td>
        <div className="baskettable__information-quantity">Количество: {quantity_trunk}</div>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity_trunk}</div>
      </td>
      <td>
        <div className="baskettable__price">{trunk.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">{trunk.new_price * quantity_trunk}</div>
      </td>
      <td>
        {openDeleteTrunkModal && (
          <ModalBasket
            remove={handleRemoveTrunk}
            id={id}
            handleCloseDeleteModal={handleCloseTrunkDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenTrunkDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default TrunkTable;
