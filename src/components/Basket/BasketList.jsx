import React from 'react';
import BasketCard from './BasketCard';
import { fetchBasket, getAllBasketProduct, deleteBasketProduct } from '../../http/basketApi';
import { useNavigate } from 'react-router-dom';
import CartEmpty from './CartEmpty';

function BasketList() {
  const [basketProduct, setBasketProduct] = React.useState([]);
  const navigate = useNavigate();

  let totalAmount = 0;
  basketProduct.forEach((basketproduct) => {
    const trunkPrice = basketproduct.trunk ? basketproduct.trunk.new_price : 0;
    const productPrice = basketproduct.product ? basketproduct.product.new_price : 0;

    totalAmount +=
      trunkPrice * basketproduct.quantity_trunk + productPrice * basketproduct.quantity;
  });

  React.useEffect(() => {
    fetchBasket().then((data) => {
      const basketId = data.id;
      getAllBasketProduct(basketId).then((item) => setBasketProduct(item));
    });
  }, []);

  const handleRemove = (id) => {
    deleteBasketProduct(id)
      .then((deletedItem) => {
        const updatedBasketProduct = basketProduct.filter((item) => item.id !== deletedItem.id);
        setBasketProduct(updatedBasketProduct);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <>
      {basketProduct.length > 0 ? (
        <div className="basketlist">
          <div className="container">
            <h1 className="basketlist__title">Корзина</h1>
            <div className="basketlist__content">
              {Array.isArray(basketProduct) &&
                basketProduct.map((obj) => (
                  <BasketCard key={obj.id} {...obj} remove={handleRemove} />
                ))}
            </div>
            <div className="basketlist__bottom">
              <div className="basketlist__bottom-content">
                <div className="basketlist__bottom-total">Общая сумма: {totalAmount}Р</div>
                <button className="basketlist__bottom-button" onClick={() => navigate('/checkout')}>
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default BasketList;
