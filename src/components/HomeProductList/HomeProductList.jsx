import React from 'react';
import CardHomeProduct from '../CardHomeProduct/CardHomeProduct';
import { getAllHome } from '../../http/homeApi';
import { getAllMaterialForAnimal } from '../../http/materailRugApi';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

import './style.scss';

function HomeProductList() {
  const [homeProducts, setHomeProducts] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  React.useEffect(() => {
    let homeProductLoaded = false;
    let materialLoaded = false;

    const fetchData = async () => {
      const homeProductData = await getAllHome();
      setHomeProducts(homeProductData);
      homeProductLoaded = true;

      const MaterialData = await getAllMaterialForAnimal();
      setMaterials(MaterialData);
      materialLoaded = true;

      if (homeProductLoaded && materialLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

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
            <img className="homeproductlist__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            <div className="homeproductlist__crumbs-item__active">EVA коврики для дома</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="homeproductlist__title">Коврики для дома</div>
        <div className="homeproductlist__subtitle">
          *Можем изготовить коврик по вашим индивидуальным размерам, звоните или пишите нам
        </div>
        <div className="homeproductlist__content">
          {homeProducts.map((homeProduct) => (
            <CardHomeProduct key={homeProduct.id} {...homeProduct} materials={materials} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeProductList;
