import React from 'react';
import CardPromo from './CardPromo';
import { getBrandToPromo } from '../../http/brandApi';
import { Link } from 'react-router-dom';

import './styles.scss';

function Promo() {
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrandToPromo();
        setBrands(data.slice(0, 12));
      } catch (error) {
        console.error('Ошибка при загрузке брендов:', error);
        alert('Не удалось загрузить бренды. Пожалуйста, попробуйте позже.');
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="promo">
      <div className="container">
        <h1 className="promo__title">Автомобильные коврики</h1>
        <div className="promo__content">
          {brands.slice(0, window.innerWidth < 1025 ? 15 : 12).map((brand) => (
            <CardPromo key={brand.id} {...brand} />
          ))}
        </div>
        <Link to="/allbrands">
          <button className="promo__button">Каталог</button>
        </Link>
      </div>
    </div>
  );
}

export default Promo;
