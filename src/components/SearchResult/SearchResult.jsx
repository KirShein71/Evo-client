import React from 'react';
import CardResult from './CardResult';
import { getAllProduct } from '../../http/productApi';
import Loader from '../Loader/Loader';

import './style.scss';

function SearchResult({ query }) {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    getAllProduct()
      .then((data) => setProducts(data))
      .finally(() => setFetching(false));
  }, []);

  React.useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    );
  }, [products, query]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="searchresult">
      <div className="container">
        {filteredProducts.length > 0 ? (
          <>
            <div className="searchresult__title">Результаты поиска по запросу {query}</div>
            <div className="searchresult__content">
              {filteredProducts
                .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
                .map((product) => (
                  <CardResult key={product.id} {...product} />
                ))}
            </div>
          </>
        ) : (
          <div className="searchresult__nothing">По вашему запросу ничего не найдено</div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
