import React from 'react';
import { deleteBasketProduct } from '../../../http/basketApi';
import ModalBasket from '../modal/ModalBasket';

function AnimalTable({ material, animal, quantity, id, change, setChange, materialId }) {
  const [openDeleteAnimalModal, setOpenDeleteAnimalModal] = React.useState(false);

  const handleRemoveAnimal = (id) => {
    deleteBasketProduct(id)
      .then(() => {
        setChange(!change);
        setOpenDeleteAnimalModal(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };
  const hadleOpenAnimalDeleteModal = () => {
    setOpenDeleteAnimalModal(true);
  };

  const handleCloseAnimalDeleteModal = () => {
    setOpenDeleteAnimalModal(false);
  };

  return (
    <>
      <td>
        {animal.animal_images
          .filter((imageAnimal) => imageAnimal.materialId === materialId)
          .map((imageAnimal) => (
            <div className="baskettable__animalimage">
              <img src={process.env.REACT_APP_IMG_URL + imageAnimal.image} alt="animal rug image" />
            </div>
          ))}
      </td>
      <td>
        <div className="baskettable__information">
          <div className="baskettable__information-name">{animal.name}</div>
          <div className="baskettable__information-options">
            Форма ячейки: Сота, Цвет материала: {material.name}
          </div>
        </div>
        <td>
          <div className="baskettable__information-price">Цена: {animal.new_price}</div>
        </td>
        <div className="baskettable__information-quantity">Количество: {quantity}</div>
      </td>
      <td>
        <div className="baskettable__quantity">{quantity}</div>
      </td>
      <td>
        <div className="baskettable__price">{animal.new_price}</div>
      </td>
      <td>
        <div className="baskettable__total">{animal.new_price * quantity}</div>
      </td>
      <td>
        {openDeleteAnimalModal && (
          <ModalBasket
            remove={handleRemoveAnimal}
            id={id}
            handleCloseDeleteModal={handleCloseAnimalDeleteModal}
          />
        )}
        <div className="baskettable__delete">
          <img src="./img/delete.png" alt="delete" onClick={hadleOpenAnimalDeleteModal} />
        </div>
      </td>
    </>
  );
}

export default AnimalTable;
