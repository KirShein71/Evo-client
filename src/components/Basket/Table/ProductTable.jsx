import React from 'react';
import { deleteBasketProduct } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';
import { AppContext } from '../../../context/AppContext';
import './style.scss';

function ProductTable({ edging, material, product, quantity, thirdrow, id }) {
  const { basketProduct } = React.useContext(AppContext);
  const [openDeleteProductModal, setOpenDeleteProductModal] = React.useState(false);

  const handleRemoveProduct = (id) => {
    deleteBasketProduct(id)
      .then((deletedItem) => {
        basketProduct.products = basketProduct.products.filter(
          (item) => item.id !== deletedItem.id,
        );
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };

  const hadleOpenProductDeleteModal = () => {
    setOpenDeleteProductModal(true);
  };

  const handleCloseProductDeleteModal = () => {
    setOpenDeleteProductModal(false);
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
          <div className="baskettable__information-name">Комплект ковриков для: {product.name}</div>
          <div className="baskettable__information-options">Форма ячейки: Сота</div>
          <div className="baskettable__information-options">Цвет материала: {material.name}</div>
          <div className="baskettable__information-options">Цвет канта: {edging.name}</div>
        </div>
        <td>
          <div className="baskettable__information-price">
            Цена: {thirdrow === null ? product.new_price : thirdrow?.new_price}
          </div>
        </td>
        <div className="baskettable__information-quantity">Количество: {quantity}</div>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity}</div>
      </td>
      <td>
        <div className="baskettable__price">
          {thirdrow === null ? product.new_price : thirdrow?.new_price}
        </div>
      </td>
      <td>
        <div className="baskettable__total">
          {thirdrow === null ? product.new_price * quantity : thirdrow?.new_price * quantity}
        </div>
      </td>
      <td>
        {openDeleteProductModal && (
          <ModalBasket
            remove={handleRemoveProduct}
            id={id}
            handleCloseDeleteModal={handleCloseProductDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenProductDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default ProductTable;
