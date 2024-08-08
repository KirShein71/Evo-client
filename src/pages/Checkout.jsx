import React from 'react';
import CheckoutList from '../components/Checkout/CheckoutList';
import { Helmet } from 'react-helmet';

function Checkout() {
  return (
    <>
      <Helmet>
        <title>Оформление заказа - Завершите покупку</title>
        <meta
          name="description"
          content="Почти готово! На этой странице вы можете подтвердить свой заказ и ввести необходимые данные для доставки. Мы сделаем все, чтобы ваш заказ был обработан быстро и без проблем! "
        />
      </Helmet>
      <CheckoutList />
    </>
  );
}

export default Checkout;
