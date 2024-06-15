import React from 'react';
import CardResult from './CardResult';
import { getAllProduct } from '../../http/productApi';

import './style.scss';

function SearchResult({ query }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getAllProduct().then((data) => setProducts(data));
  }, []);

  return (
    <div className="searchresult">
      <div className="container">
        <div className="searchresult__content">
          {products
            .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
            .map((product) => (
              <CardResult key={product.id} {...product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
