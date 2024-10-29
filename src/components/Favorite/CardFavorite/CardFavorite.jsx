import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import { deleteFavoriteProduct } from '../../../http/favoriteApi';
import { AppContext } from '../../../context/AppContext';

import './style.scss';

function CardFavorite({ product, change, setChange }) {
  const [originalName] = React.useState(product.name);

  const { favoriteProduct } = React.useContext(AppContext);

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

  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');

  return (
    <div className="cardfavorite">
      <div to={`/productproperty/${formattedName}`} className="cardfavorite__content">
        <div className="cardfavorite__favorite">
          <div style={{ position: 'absolute' }}>
            <ClearIcon fontSize="small" onClick={() => handleDeleteFavoriteProduct(product.id)} />
          </div>
        </div>
        <Link to={`/productproperty/${formattedName}`}>
          <div className="cardfavorite__image">
            <img src={process.env.REACT_APP_IMG_URL + product.image} alt="image_car" />
          </div>
        </Link>
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
