import React from 'react';
import SearchResult from '../components/SearchResult/SearchResult';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Result() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <>
      <Helmet>
        <title>Результаты поиска</title>
        <meta
          name="description"
          content="Добро пожаловать на страницу результатов поиска автомобильных ковриков! Здесь вы найдете широкий выбор ковриков для вашего автомобиля, подходящих для различных марок и моделей. Мы собрали лучшие предложения от проверенных производителей, чтобы обеспечить максимальный комфорт и защиту вашего салона. Используйте фильтры для удобного поиска по материалу, цвету и цене, и выберите идеальный вариант для вашего автомобиля. Приятных покупок!"
        />
        <meta
          name="keywords"
          content="автомобильные коврики, коврики для автомобилей, автомобильные коврики EVA"
        />
        <meta property="og:title" content="Результаты поиска" />
        <meta
          property="og:description"
          content="Добро пожаловать на страницу результатов поиска автомобильных ковриков! Здесь вы найдете широкий выбор ковриков для вашего автомобиля, подходящих для различных марок и моделей. Мы собрали лучшие предложения от проверенных производителей, чтобы обеспечить максимальный комфорт и защиту вашего салона. Используйте фильтры для удобного поиска по материалу, цвету и цене, и выберите идеальный вариант для вашего автомобиля. Приятных покупок!"
        />
        <meta property="og:url" content="https://www.savaks.ru/result?query" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <SearchResult query={query} />
    </>
  );
}

export default Result;
