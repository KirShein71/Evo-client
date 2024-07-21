import React from 'react';
import { deleteOrganizer } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function OrganizerTable({ organizer, quantity_organizer, id, change, setChange }) {
  const [openDeleteOrganizerModal, setOpenDeleteOrganizerModal] = React.useState(false);

  const handleRemoveOrganizer = (id) => {
    deleteOrganizer(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteOrganizerModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenOrganizerDeleteModal = () => {
    setOpenDeleteOrganizerModal(true);
  };

  const handleCloseOrganizerDeleteModal = () => {
    setOpenDeleteOrganizerModal(false);
  };

  return (
    <>
      <td>
        {' '}
        <div className="baskettable__image">
          <img
            className="baskettable__image-organizer"
            src="./img/organizer.jpg"
            alt="organizer__image"
          />
        </div>
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">Органайзер {organizer.size} см</div>
        </div>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity_organizer}</div>
      </td>
      <td>
        <div className="baskettable__price">{organizer.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">{organizer.new_price * quantity_organizer}</div>
      </td>
      <td>
        {openDeleteOrganizerModal && (
          <ModalBasket
            remove={handleRemoveOrganizer}
            id={id}
            handleCloseDeleteModal={handleCloseOrganizerDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenOrganizerDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default OrganizerTable;
