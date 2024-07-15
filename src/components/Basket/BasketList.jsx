import React from 'react';
import BasketCard from './BasketCard';
import { fetchBasket, getAllBasketProduct, deleteBasketProduct } from '../../http/basketApi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CartEmpty from './CartEmpty';
import Loader from '../Loader/Loader';
import { observer } from 'mobx-react';

const BasketList = observer(() => {
  const { basketProduct } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    fetchBasket().then((data) => {
      const basketId = data.id;
      getAllBasketProduct(basketId)
        .then((item) => {
          basketProduct.products = item;
          setFetching(false);
        })
        .catch((error) => {
          console.error('Произошла ошибка при загрузке данных:', error);
          setFetching(false);
        });
    });
  }, [basketProduct]);

  let totalAmount = 0;
  basketProduct.products.forEach((basketproduct) => {
    const trunkPrice = basketproduct.trunk ? basketproduct.trunk.new_price : 0;
    const thirdrowPrice = basketproduct.thirdrow ? basketproduct.thirdrow.new_price : 0;
    const productPrice = basketproduct.product ? basketproduct.product.new_price : 0;
    const animalPrice = basketproduct.animal ? basketproduct.animal.new_price : 0;
    const homePrice = basketproduct.home ? basketproduct.home.new_price : 0;
    const saddlePrice = basketproduct.saddle ? basketproduct.saddle.new_price : 0;
    const steelPrice = basketproduct.steel ? basketproduct.steel.new_price : 0;
    const organizerPrice = basketproduct.organizer ? basketproduct.organizer.new_price : 0;
    const organizerFiftyPrice = basketproduct.organizerfifty
      ? basketproduct.organizerfifty.new_price
      : 0;
    totalAmount +=
      trunkPrice * basketproduct.quantity_trunk +
      (thirdrowPrice === 0
        ? productPrice * basketproduct.quantity
        : thirdrowPrice * basketproduct.quantity) +
      animalPrice * basketproduct.quantity +
      homePrice * basketproduct.quantity +
      saddlePrice +
      steelPrice +
      organizerPrice * basketproduct.quantity_organizer +
      organizerFiftyPrice * basketproduct.quantity_organizerfifty;
  });

  const handleRemove = (id) => {
    deleteBasketProduct(id)
      .then((deletedItem) => {
        basketProduct.products = basketProduct.products.filter(
          (item) => item.id !== deletedItem.id,
        );
      })
      .catch((error) => {
        console.error('Произошла ошибка при удалении товара:', error);
      });
  };

  const handleCheckout = () => {
    // Сохранение в localStorage
    localStorage.setItem('totalAmount', totalAmount);

    // Переход на checkout
    navigate('/checkout');
  };

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      {basketProduct.products.length > 0 ? (
        <div className="basketlist">
          <div className="container">
            <h1 className="basketlist__title">Корзина</h1>
            <div className="basketlist__content">
              {Array.isArray(basketProduct.products) &&
                basketProduct.products.map((obj) => (
                  <BasketCard key={obj.id} {...obj} remove={handleRemove} />
                ))}
            </div>
            <div className="basketlist__bottom">
              <div className="basketlist__bottom-content">
                <div className="basketlist__bottom-total">Общая сумма: {totalAmount}Р</div>
                <button className="basketlist__bottom-button" onClick={handleCheckout}>
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
});

export default BasketList;
