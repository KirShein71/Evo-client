import React from 'react';

import { AppContext } from '../../../context/AppContext';
import { observer } from 'mobx-react';
import FavoriteCard from './FavoriteCard';

import './style.scss';

const ProductFavorite = observer(({ favoriteProduct, change, setChange }) => {
  return (
    <div className="product-favorite">
      <div className="product-favorite__content">
        <h2 className="product-favorite__title">Избранное</h2>
        <div className="product-favorite__cards">
          {favoriteProduct.items.length > 0
            ? Array.isArray(favoriteProduct.items) &&
              favoriteProduct.items.map((favoriteProduct) => (
                <FavoriteCard
                  key={favoriteProduct.id}
                  {...favoriteProduct}
                  change={change}
                  setChange={setChange}
                />
              ))
            : ''}
        </div>
      </div>
    </div>
  );
});

export default ProductFavorite;
