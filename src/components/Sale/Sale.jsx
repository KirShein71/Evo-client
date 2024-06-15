import React from 'react';
import './styles.scss';
import CardSale from '../CardSale/CardSale';
import { getSaleProduct } from '../../http/productApi';

function Sale() {
  const [saleProducts, setSaleProducts] = React.useState([]);

  React.useEffect(() => {
    getSaleProduct()
      .then((data) => setSaleProducts(data))
      .catch((error) => alert(error.response.data.message));
  }, []);

  return (
    <div className="sale">
      <div className="container">
        <h2 className="sale__title">Актуальные акции</h2>
        <div className="sale__content">
          {saleProducts.map((saleProduct) => (
            <CardSale {...saleProduct} key={saleProduct.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sale;
