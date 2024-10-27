import React from 'react';
import { getAllFavoriteProduct } from '../../http/favoriteApi';
import { fetchBasket } from '../../http/basketApi';
import CardFavorite from './CardFavorite/CardFavorite';
import { AppContext } from '../../context/AppContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import FavoriteEmpty from './FavoriteEmpty';

import './style.scss';

const Favorite = observer(() => {
  const { favoriteProduct } = React.useContext(AppContext);
  const [change, setChange] = React.useState(true);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    fetchBasket().then((data) => {
      const basketId = data.id;
      getAllFavoriteProduct(basketId)
        .then((item) => {
          favoriteProduct.items = item;
          setFetching(false);
        })
        .catch((error) => {
          console.error('Произошла ошибка при загрузке данных:', error);
        });
    });
  }, [favoriteProduct, change]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      {favoriteProduct.items.length > 0 ? (
        <div className="favorite">
          <div className="favorite__crumbs">
            <div className="container">
              <div className="favorite__crumbs-content">
                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
                  <div className="favorite__crumbs-item">Главная</div>
                </Link>
                <img className="favorite__crumbs-icon" src="../img/arrow.png" alt="arrow" />
                <div className="favorite__crumbs-item__active">Избранное</div>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className="favorite__title">Избранное</h2>
            <div className="favorite__content">
              {Array.isArray(favoriteProduct.items) &&
                favoriteProduct.items.map((favorite) => (
                  <CardFavorite
                    key={favorite.id}
                    {...favorite}
                    change={change}
                    setChange={setChange}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <FavoriteEmpty />
      )}
    </>
  );
});

export default Favorite;
