import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { appendFavorite } from '../../http/basketApi';
import { deleteFavoriteProduct } from '../../http/favoriteApi';
import { AppContext } from '../../context/AppContext';
import './styles.scss';
import { observer } from 'mobx-react';

const CardProduct = observer(({ name, old_price, new_price, image, id, pattern_image }) => {
  const [originalName] = React.useState(name);
  const { favoriteProduct } = React.useContext(AppContext);
  const [isAddedToFavorite, setIsAddedToFavorite] = React.useState(false);

  // Используйте MobX для обновления состояния
  const checkIfFavorite = React.useCallback(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    let favorites = [];
    if (storedFavorites !== null) {
      favorites = JSON.parse(storedFavorites);
    }
    return favorites.includes(id);
  }, [id]); // Добавляем id как зависимость

  React.useEffect(() => {
    setIsAddedToFavorite(checkIfFavorite());
  }, [checkIfFavorite, favoriteProduct.items]);

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
    <div className="cardproduct">
      <div className="cardproduct__favorite">
        <div style={{ position: 'absolute' }}>
          {isAddedToFavorite ? (
            <FavoriteIcon fontSize="small" onClick={() => handleDeleteFavoriteProduct(id)} />
          ) : (
            <FavoriteBorderIcon fontSize="small" onClick={() => clickToFavorite(id)} />
          )}
        </div>
      </div>
      <Link to={`/productproperty/${formattedName}`} className="cardproduct__content">
        <div className="cardproduct__image">
          <img src={process.env.REACT_APP_IMG_URL + image} alt="image_car" />
        </div>
        <div className="cardproduct__pattern-image">
          <img src={process.env.REACT_APP_IMG_URL + pattern_image} alt="image_car" />
        </div>
        <div class="cardproduct__bottom">
          <h4 class="cardproduct__title">{name}</h4>
          <div class="cardproduct__price">
            <small>{old_price} Р</small>
            {new_price} Р
          </div>
        </div>
      </Link>
    </div>
  );
});

export default CardProduct;
