import React from 'react';
import CardBag from './CardBag';
import { getAllBag } from '../../../http/bagApi';
import Loader from '../../Loader/Loader';

import './style.scss';

function Bag() {
  const [bags, setBags] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    setFetching(true); // Устанавливаем состояние загрузки перед началом запроса
    getAllBag()
      .then((data) => setBags(data))
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      })
      .finally(() => setFetching(false)); // Устанавливаем состояние загрузки в false в любом случае
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="bag">
      <div className="bag__content">
        {bags.map((bag) => (
          <CardBag key={bag.id} {...bag} />
        ))}
      </div>
    </div>
  );
}

export default Bag;
