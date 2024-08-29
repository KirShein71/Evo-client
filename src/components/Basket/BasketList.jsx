import React from 'react';
import { fetchBasket, getAllBasketProduct } from '../../http/basketApi';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CartEmpty from './CartEmpty';
import Loader from '../Loader/Loader';
import { observer } from 'mobx-react';
import { Table } from 'react-bootstrap';
import ProductTable from './Table/ProductTable';
import TrunkTable from './Table/TrunkTable';
import SaddleTable from './Table/SaddleTable';
import OrganizerTable from './Table/OrganizerTable';
import OrganizerFiftyTable from './Table/OrganizerFifty';
import SteelTable from './Table/SteelTable';
import AnimalTable from './Table/AnimalTable';
import HomeTable from './Table/HomeTable';

const BasketList = observer(() => {
  const { basketProduct } = React.useContext(AppContext);
  const [change, setChange] = React.useState(true);
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
  }, [basketProduct, change]);

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
          <div className="basketlist__crumbs">
            <div className="container">
              <div className="basketlist__crumbs-content">
                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
                  <div className="basketlist__crumbs-item">Главная</div>
                </Link>
                <img className="basketlist__crumbs-icon" src="../img/arrow.png" alt="arrow" />
                <div className="basketlist__crumbs-item__active">Корзина</div>
              </div>
            </div>
          </div>
          <div className="container">
            <h1 className="basketlist__title">Корзина</h1>
            <div className="basketlist">
              <div className="basketlist__content">
                <Table size="sm">
                  <thead>
                    <tr>
                      <th div className="basketlist__tabletitle">
                        Наименование
                      </th>
                      <th></th>
                      <th div className="basketlist__tableheader">
                        Кол-во
                      </th>
                      <th div className="basketlist__tableheader">
                        Цена
                      </th>
                      <th div className="basketlist__tableheader">
                        Сумма
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(basketProduct.products) &&
                      basketProduct.products.map((obj) => (
                        <>
                          {obj.product !== null ? (
                            <tr key={obj.id}>
                              <ProductTable {...obj} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.trunk !== null ? (
                            <tr>
                              <TrunkTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.organizer !== null ? (
                            <tr>
                              <OrganizerTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.organizerfifty !== null ? (
                            <tr>
                              <OrganizerFiftyTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.saddle !== null ? (
                            <tr>
                              <SaddleTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.steel !== null ? (
                            <tr>
                              <SteelTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.animal !== null ? (
                            <tr>
                              <AnimalTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                          {obj.home !== null ? (
                            <tr>
                              <HomeTable {...obj} change={change} setChange={setChange} />
                            </tr>
                          ) : (
                            ''
                          )}
                        </>
                      ))}
                  </tbody>
                </Table>
              </div>
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
