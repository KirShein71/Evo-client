import React from 'react';
import { deleteBagFifty } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function BagFiftyTable({
  bagmaterial,
  bag,
  id,
  change,
  setChange,
  bagmaterialId,
  bagfifty,
  quantity_bagfifty,
}) {
  const [openDeleteBagModal, setOpenDeleteBagModal] = React.useState(false);

  const handleRemoveBagFifty = (id) => {
    deleteBagFifty(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteBagModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenBagDeleteModal = () => {
    setOpenDeleteBagModal(true);
  };

  const handleCloseBagDeleteModal = () => {
    setOpenDeleteBagModal(false);
  };

  return (
    <>
      <td>
        {bag.bag_images
          .filter((imageBag) => imageBag.bagmaterialId === bagmaterialId)
          .map((imageBag) => (
            <div className="baskettable__animalimage">
              <img src={process.env.REACT_APP_IMG_URL + imageBag.image} alt="bag image" />
            </div>
          ))}
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">{bag.name}</div>
          <div className="baskettable__information-options">Цвет материала: {bagmaterial.name}</div>
          <div className="baskettable__information-options">Размер: {bagfifty.size} см</div>
        </div>
        <td>
          <div className="baskettable__information-price">Цена: {bagfifty.price}</div>
        </td>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity_bagfifty}</div>
      </td>
      <td>
        <div className="baskettable__price">{bagfifty.price}</div>
      </td>
      <td>
        <div className="baskettable__total">{bagfifty.price * quantity_bagfifty}</div>
      </td>
      <td>
        {openDeleteBagModal && (
          <ModalBasket
            remove={handleRemoveBagFifty}
            id={id}
            handleCloseDeleteModal={handleCloseBagDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenBagDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default BagFiftyTable;
