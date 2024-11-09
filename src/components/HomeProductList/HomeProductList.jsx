import React from 'react';
import CardHomeProduct from '../CardHomeProduct/CardHomeProduct';
import { getAllHome } from '../../http/homeApi';
import { getAllMaterialForAnimal } from '../../http/materailRugApi';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

import './style.scss';

function HomeProductList() {
  const [homeProducts, setHomeProducts] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);
  const order = [43, 44, 45, 38, 39, 40, 41, 42, 47, 48, 50];

  React.useEffect(() => {
    let homeProductLoaded = false;
    let materialLoaded = false;

    const fetchData = async () => {
      try {
        const homeProductData = await getAllHome();
        setHomeProducts(homeProductData);
        homeProductLoaded = true;

        const materialData = await getAllMaterialForAnimal();
        setMaterials(materialData);
        materialLoaded = true;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        if (homeProductLoaded || materialLoaded) {
          setFetching(false);
        }
      }
    };

    fetchData();
  }, []);

  const sortedHomeProducts = homeProducts.sort((a, b) => {
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="homeproductlist">
      <div className="homeproductlist__crumbs">
        <div className="container">
          <div className="homeproductlist__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="homeproductlist__crumbs-item">Главная</div>
            </Link>
            <div className="contaclist__crumbs-icon">
              <ArrowRightAltIcon sx={{ color: '#ffffff', fontSize: 28 }} />
            </div>
            <div className="homeproductlist__crumbs-item__active">EVA коврики для дома</div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="homeproductlist__title">Коврики для дома</h1>
        <p className="homeproductlist__subtitle">
          *Можем изготовить коврик по вашим индивидуальным размерам, звоните или пишите нам
        </p>
        <div className="homeproductlist__content">
          {sortedHomeProducts.map((homeProduct) => (
            <CardHomeProduct key={homeProduct.id} {...homeProduct} materials={materials} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeProductList;
