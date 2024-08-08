import React from 'react';
import BasketList from '../components/Basket/BasketList';
import { Helmet } from 'react-helmet';

function Basket() {
  return (
    <>
      <Helmet>
        <title>Корзина</title>
        <meta
          name="description"
          content=" Посмотрите все товары, которые вы добавили в свою корзину. Здесь вы можете изменить количество, удалить ненужные позиции и перейти к оформлению заказа. Убедитесь, что вы не пропустили ни одного товара, чтобы сделать свои покупки максимально удобными и приятными!"
        />
        <meta
          name="keywords"
          content="корзина, товары, автомобильные коврики, коврики для автомобилей, автомобильные коврики EVA"
        />
      </Helmet>
      <BasketList />;
    </>
  );
}

export default Basket;
