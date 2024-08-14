import React from 'react';
import { appendHome } from '../../http/basketApi';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import ModalImage from './ModalImage';

function CardHomeProduct({ name, new_price, id, materials, home_images }) {
  const [quantity, setQuantity] = React.useState(1);
  const isCountDisabled = quantity <= 1;
  const [selectedMaterial, setSelectedMaterial] = React.useState('blacksota');
  const [selectedMaterialName, setSelectedMaterialName] = React.useState('Черный');
  const [selectedMaterialId, setSelectedMaterialId] = React.useState(28);
  const [buttonText, setButtonText] = React.useState('В корзину');
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  const [openModalImage, setOpenModalImage] = React.useState(false);
  const navigate = useNavigate();

  const clickToCart = (homeId, materialId, quantity) => {
    appendHome(homeId, materialId, quantity)
      .then((data) => {
        setIsAddedToCart(true);
        setButtonText('В корзине');
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleClickImage = () => {
    setOpenModalImage(true);
  };

  const closedImageModal = () => {
    setOpenModalImage(false);
  };

  const goToCart = () => {
    navigate('/basket');
  };

  return (
    <div className="cardhomeproduct">
      <div className="cardhomeproduct__content">
        <div className="cardhomeproduct__image">
          {home_images.map((icon) => {
            return (
              <div
                key={icon.id}
                style={{
                  display: icon.materialId === selectedMaterialId ? 'block' : 'none',
                }}>
                <img
                  src={process.env.REACT_APP_IMG_URL + icon.image}
                  alt="rug for home"
                  onClick={() => handleClickImage(icon.image)}
                />
              </div>
            );
          })}
        </div>
        {openModalImage && (
          <ModalImage
            closedImageModal={closedImageModal}
            image={
              home_images.find((imageItem) => imageItem.materialId === selectedMaterialId)?.image
            }
          />
        )}
      </div>
      <div className="cardhomeproduct__constructor">
        <div className="cardhomeproduct__constructor-material">
          <div className="cardhomeproduct__constructor-material__title">
            Цвет коврика: {selectedMaterialName}{' '}
          </div>
          <div className="cardhomeproduct__constructor-material__items">
            {materials.map((material) => (
              <div
                key={material.id}
                onClick={() => {
                  setSelectedMaterial(material.color);
                  setSelectedMaterialName(material.name);
                  setSelectedMaterialId(material.id);
                }}>
                <div
                  className={`cardhomeproduct__constructor-material__item ${material.color} ${
                    selectedMaterial === material.color ? 'active' : ''
                  }`}
                  style={{ backgroundColor: material.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cardhomeproduct__equipment">
        <div className="cardhomeproduct__equipment-quantity">
          <button
            className="minus"
            onClick={() => setQuantity(quantity - 1)}
            disabled={isCountDisabled}>
            <img src="../img/minus.png" alt="minus" />
          </button>
          <div className="cardhomeproduct__equipment-total">{quantity}</div>
          <button className="plus" onClick={() => setQuantity(quantity + 1)}>
            <img src="../img/plus.png" alt="plus" />
          </button>
        </div>
      </div>
      <div class="cardhomeproduct__bottom">
        <h4 class="cardhomeproduct__title">{name}</h4>
        <div class="cardhomeproduct__price">{new_price * quantity} Р</div>
        <div style={{ marginTop: '10px' }}>
          <button
            onClick={() => {
              if (isAddedToCart) {
                goToCart();
              } else {
                clickToCart(id, selectedMaterialId, quantity);
              }
            }}
            type="button"
            id="cardhomeproduct__button"
            className={isAddedToCart ? 'added' : ''}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardHomeProduct;
