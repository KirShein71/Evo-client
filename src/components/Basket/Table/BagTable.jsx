import React from 'react';
import { deleteBasketProduct } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function BagTable({
  bagmaterial,
  bag,
  id,
  change,
  setChange,
  bagmaterialId,
  bagsizeId,
  bagsize,
  quantity,
}) {
  const [openDeleteBagModal, setOpenDeleteBagModal] = React.useState(false);

  const handleRemoveBag = (id) => {
    deleteBasketProduct(id)
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
          .filter(
            (imageBag) =>
              imageBag.bagmaterialId === bagmaterialId && imageBag.bagsizeId === bagsizeId,
          )
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
          <div className="baskettable__information-options">Размер: {bagsize.size} см</div>
        </div>
        <td>
          <div className="baskettable__information-price">Цена: {bagsize.price}</div>
        </td>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity}</div>
      </td>
      <td>
        <div className="baskettable__price">{bagsize.price}</div>
      </td>
      <td>
        <div className="baskettable__total">{bagsize.price * quantity}</div>
      </td>
      <td>
        {openDeleteBagModal && (
          <ModalBasket
            remove={handleRemoveBag}
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

export default BagTable;
