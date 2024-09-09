import React from 'react';
import CardBag from '../../AccessoriesList/Bag/CardBag';
import { getAllBag } from '../../../http/bagApi';
import './style.scss';

function BottomSale() {
  const [bags, setBags] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    getAllBag()
      .then((data) => setBags(data))
      .finally(() => setFetching(false));
  }, []);

  return (
    <div className="bottomsale">
      <h3 className="bottomsale__title">С этим товаром покупают</h3>
      <div className="bottomsale__content">
        {bags.map((bag) => (
          <CardBag key={bag.id} {...bag} />
        ))}
      </div>
    </div>
  );
}

export default BottomSale;
