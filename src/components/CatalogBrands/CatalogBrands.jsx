import React from 'react';
import CardBrand from '../CardBrand/CardBrand';
import { getAllBrand } from '../../http/brandApi';
import Loader from '../Loader/Loader';

import './styles.scss';

function CatalogBrands() {
  const [brands, setBrands] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getAllBrand()
      .then((data) => setBrands(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="catalogbrands">
      <div className="container">
        <div className="catalogbrands__content">
          {brands.map((brand) => (
            <CardBrand key={brand.id} {...brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogBrands;
