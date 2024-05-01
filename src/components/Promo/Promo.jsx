import React from 'react';
import CardBrand from '../CardBrand/CardBrand';
import { getAllBrand } from '../../http/brandApi';
import { Link } from 'react-router-dom';

import './styles.scss';

function Promo() {
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    getAllBrand().then((data) => setBrands(data.slice(0, 18)));
  }, []);

  return (
    <div className="promo">
      <div className="container">
        <h1 className="promo__title">Автомобильные коврики</h1>
        <div className="promo__content">
          {brands.slice(0, window.innerWidth < 768 ? 15 : 18).map((brand) => (
            <CardBrand key={brand.id} {...brand} />
          ))}
        </div>
        <Link to="/allbrands">
          <button className="promo__button">Все марки</button>
        </Link>
      </div>
    </div>
  );
}

export default Promo;
