import React from 'react';
import CardPromo from './CardPromo';
import { getBrandToPromo } from '../../../http/brandApi';
import { Link } from 'react-router-dom';

import './style.scss';

function PromoCatalogs() {
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    getBrandToPromo().then((data) => setBrands(data.slice(0, 15)));
  }, []);

  return (
    <div className="promo-catalog">
      <div className="container">
        <h1 className="promo-catalog__title">Автомобильные коврики</h1>
        <div className="promo-catalog__content">
          {brands.slice(0, window.innerWidth < 1025 ? 15 : 12).map((brand) => (
            <CardPromo key={brand.id} {...brand} />
          ))}
        </div>
        <Link to="/allbrands">
          <button className="promo-catalog__button">Все марки</button>
        </Link>
      </div>
    </div>
  );
}

export default PromoCatalogs;
