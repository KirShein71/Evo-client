import React from 'react';
import { deleteBasketProduct } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';
import { Link } from 'react-router-dom';

function HomeTable({ material, home, quantity, id, change, setChange, materialId }) {
  const [openDeleteHomeModal, setOpenDeleteHomeModal] = React.useState(false);

  const handleRemoveHome = (id) => {
    deleteBasketProduct(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteHomeModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenHomeDeleteModal = () => {
    setOpenDeleteHomeModal(true);
  };

  const handleCloseHomeDeleteModal = () => {
    setOpenDeleteHomeModal(false);
  };

  return (
    <>
      <td>
        {home?.home_images
          .filter((imageHome) => imageHome.materialId === materialId)
          .map((imageHome) => (
            <div className="baskettable__homeimage">
              <img src={process.env.REACT_APP_IMG_URL + imageHome.image} alt="home rug" />
            </div>
          ))}
      </td>
      <td>
        <div className="baskettable__information">
          <Link to="/homeproduct">
            <div className="baskettable__information-name">{home?.name}</div>
          </Link>
          <div className="baskettable__information-options">
            Форма ячейки: Сота, Цвет материала: {material.name}
          </div>
        </div>
        <td>
          <div className="baskettable__information-price">Цена: {home?.new_price}</div>
        </td>
        <div className="baskettable__information-quantity">Количество: {quantity}</div>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity}</div>
      </td>
      <td>
        <div className="baskettable__price">{home?.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">{home?.new_price * quantity}</div>
      </td>
      <td>
        {openDeleteHomeModal && (
          <ModalBasket
            remove={handleRemoveHome}
            id={id}
            handleCloseDeleteModal={handleCloseHomeDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenHomeDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default HomeTable;
