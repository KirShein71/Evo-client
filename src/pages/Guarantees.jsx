import React from 'react';
import GuaranteesList from '../components/Guarantees/GuaranteesList';
import { Helmet } from 'react-helmet';

function Guarantees() {
  return (
    <>
      <Helmet>
        <title>Гарантия</title>
        <meta
          name="description"
          content="На нашей странице Гарантия качества мы уверены в каждом товаре, который предлагаем. Мы предлагаем прозрачные условия гарантии, чтобы вы могли совершать покупки с уверенностью. Если ваш продукт не соответствует ожиданиям или имеет производственный дефект, мы готовы помочь вам с возвратом или обменом. Узнайте больше о наших гарантийных условиях и убедитесь, что ваше удовлетворение — наш главный приоритет!"
        />
        <meta name="keywords" content="гарантии, качество товаров" />
      </Helmet>
      <GuaranteesList />
    </>
  );
}

export default Guarantees;
