import React from 'react';
import CardHomeProduct from '../CardHomeProduct/CardHomeProduct';
import { getAllHome } from '../../http/homeApi';
import LoaderAnimal from '../LoaderAnimal/LoaderAnimal';

import './style.scss';

function HomeProductList() {
  const [homeProducts, setHomeProducts] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getAllHome()
      .then((data) => {
        setHomeProducts(data);
        setFetching(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при загрузке данных:', error);
        setFetching(false);
      });
  }, []);

  if (fetching) {
    return <LoaderAnimal />;
  }

  return (
    <div className="homeproductlist">
      <div className="container">
        <div className="homeproductlist__title">Коврики для дома</div>
        <div className="homeproductlist__subtitle">
          *Можем изготовить коврик по вашим индивидуальным размерам, звоните или пишите нам
        </div>
        <div className="homeproductlist__content">
          {homeProducts.map((homeProduct) => (
            <CardHomeProduct key={homeProduct.id} {...homeProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeProductList;
