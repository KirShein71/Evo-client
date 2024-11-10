import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { deleteFavoriteProduct } from '../../http/favoriteApi';
import { appendFavorite } from '../../http/basketApi';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.scss';

function CardResult({ name, old_price, new_price, image, id }) {
  const [originalName] = React.useState(name);
  const { favoriteProduct } = React.useContext(AppContext);
  const [setIsAddedToFavorite] = React.useState(false);

  // Используйте MobX для обновления состояния
  const checkIfFavorite = React.useCallback(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    let favorites = []; // Инициализируем favorites как пустой массив
    if (storedFavorites !== null) {
      favorites = JSON.parse(storedFavorites); // Преобразуем только если localStorage не пустой
    }
    return favorites.includes(id);
  }, [id]); // Добавляем id как зависимость

  // Используйте MobX для обновления состояния
  React.useEffect(() => {
    setIsAddedToFavorite(checkIfFavorite());
    console.log('check', checkIfFavorite());
  }, [favoriteProduct.items, checkIfFavorite, setIsAddedToFavorite]);

  // Функция для обновления localStorage
  const updateLocalStorage = (favorites) => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
  };

  const clickToFavorite = (productId) => {
    appendFavorite(productId)
      .then(() => {
        favoriteProduct.addToFavorites(productId);
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
        favorites.push(productId);
        console.log(favorites);
        updateLocalStorage(favorites); // Обновляем localStorage

        setIsAddedToFavorite(true);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleDeleteFavoriteProduct = (productId) => {
    deleteFavoriteProduct(productId)
      .then(() => {
        favoriteProduct.removeFromFavorites(productId);
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
        const updatedFavorites = favorites.filter((favId) => favId !== productId);
        console.log('delete', favorites);
        updateLocalStorage(updatedFavorites); // Обновляем localStorage

        setIsAddedToFavorite(false);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');

  return (
    <div className="cardresult">
      <div className="cardresult__favorite">
        <div style={{ position: 'absolute' }}>
          {checkIfFavorite() ? (
            <FavoriteIcon fontSize="small" onClick={() => handleDeleteFavoriteProduct(id)} />
          ) : (
            <FavoriteBorderIcon fontSize="small" onClick={() => clickToFavorite(id)} />
          )}
        </div>
      </div>
      <Link to={`/productproperty/${formattedName}`} className="cardresult__content">
        <div className="cardresult__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div class="cardresult__bottom">
          <h4 class="cardresult__title">{name}</h4>
          <div class="cardresult__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardResult;
