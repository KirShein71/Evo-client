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
        <meta property="og:title" content="Оформление заказа - Завершите покупку" />
        <meta
          property="og:description"
          content="Почти готово! На этой странице вы можете подтвердить свой заказ и ввести необходимые данные для доставки. Мы сделаем все, чтобы ваш заказ был обработан быстро и без проблем! "
        />
        <meta property="og:url" content="https://www.savaks.ru/checkout" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <CheckoutList />
    </>
  );
}

export default Checkout;
