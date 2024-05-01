import React from 'react';
import CardBrand from '../CardBrand/CardBrand';
import { getAllBrand } from '../../http/brandApi';

import './styles.scss';

function CatalogBrands() {
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    getAllBrand().then((data) => setBrands(data));
  }, []);

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
