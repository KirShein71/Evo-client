import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteFavoriteProduct } from '../../../http/favoriteApi';
import { AppContext } from '../../../context/AppContext';

import './style.scss';

function CardFavorite({ product, change, setChange }) {
  const [originalName] = React.useState(product.name);
  const navigate = useNavigate();
  const location = useLocation();
  const { favoriteProduct } = React.useContext(AppContext);

  const addToOneProduct = () => {
    const formattedName = originalName.replace(/\s+/g, '-').toLowerCase(); // Форматируем имя для URL
    navigate(`/productproperty/${formattedName}`, {
      state: { from: location.pathname, originalName },
    });
  };

  const updateLocalStorage = (favorites) => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
  };

  const handleDeleteFavoriteProduct = (productId) => {
    deleteFavoriteProduct(productId)
      .then(() => {
        favoriteProduct.removeFromFavorites(productId);
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
        const updatedFavorites = favorites.filter((favId) => favId !== productId);
        console.log('delete', favorites);
        updateLocalStorage(updatedFavorites); // Обновляем localStorage

        setChange(!change);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div className="cardfavorite">
      <div className="cardfavorite__content">
        <div className="cardfavorite__favorite">
          <div style={{ position: 'absolute' }}>
            <ClearIcon fontSize="small" onClick={() => handleDeleteFavoriteProduct(product.id)} />
          </div>
        </div>
        <div className="cardfavorite__image" onClick={addToOneProduct}>
          <img src={process.env.REACT_APP_IMG_URL + product.image} alt="image_car" />
        </div>
        <div class="cardfavorite__bottom">
          <h4 class="cardfavorite__title">{product.name}</h4>
          <div class="cardfavorite__price">
            <small>{product.old_price} Р</small>
            {product.new_price} Р
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFavorite;
