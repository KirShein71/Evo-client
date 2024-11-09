import React from 'react';
import CardPromo from '../Promo/CardPromo';
import CardBrand from '../CardBrand/CardBrand';
import { getAllBrand } from '../../http/brandApi';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SearchSection from '../SearchSection/SearchSection';

import './styles.scss';
function CatalogBrands() {
  const [brands, setBrands] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    setFetching(true); // Устанавливаем состояние загрузки перед началом запроса
    getAllBrand()
      .then((data) => setBrands(data))
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      })
      .finally(() => setFetching(false)); // Устанавливаем состояние загрузки в false в любом случае
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="catalogbrands">
      <div className="catalogbrands__crumbs">
        <div className="container">
          <div className="catalogbrands__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="catalogbrands__crumbs-item">Главная</div>
            </Link>
            <div className="contaclist__crumbs-icon">
              <ArrowRightAltIcon sx={{ color: '#ffffff', fontSize: 28 }} />
            </div>
            <div className="catalogbrands__crumbs-item__active">Каталог</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="catalogbrands__content">
            {brands.map((brand) => (
              <CardBrand key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogBrands;
