import React from 'react';
import { deleteOrganizerFifty } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function OrganizerFiftyFiftyTable({
  organizerfifty,
  quantity_organizerfifty,
  id,
  change,
  setChange,
}) {
  const [openDeleteOrganizerFiftyModal, setOpenDeleteOrganizerFiftyModal] = React.useState(false);

  const handleRemoveOrganizerFifty = (id) => {
    deleteOrganizerFifty(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteOrganizerFiftyModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenOrganizerFiftyDeleteModal = () => {
    setOpenDeleteOrganizerFiftyModal(true);
  };

  const handleCloseOrganizerFiftyDeleteModal = () => {
    setOpenDeleteOrganizerFiftyModal(false);
  };

  return (
    <>
      <td>
        {' '}
        <div className="baskettable__image">
          <img
            className="baskettable__image-organizer"
            src="./img/organizer.jpg"
            alt="OrganizerFifty__image"
          />
        </div>
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">Органайзер {organizerfifty.size} см</div>
        </div>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity_organizerfifty}</div>
      </td>
      <td>
        <div className="baskettable__price">{organizerfifty.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">
          {organizerfifty.new_price * quantity_organizerfifty}
        </div>
      </td>
      <td>
        {openDeleteOrganizerFiftyModal && (
          <ModalBasket
            remove={handleRemoveOrganizerFifty}
            id={id}
            handleCloseDeleteModal={handleCloseOrganizerFiftyDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenOrganizerFiftyDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default OrganizerFiftyFiftyTable;
