import React from 'react';

import './style.scss';

function Reviews() {
  return (
    <div className="reviews" id="reviews">
      <div className="container">
        <h3 className="reviews__title">Отзывы наших клиентов</h3>
        <div className="reviews__content">
          <div className="reviews__image">
            <img src="../img/rug-category.jpg" alt="car mat" />
          </div>
          <p className="reviews__text">
            Заказал комплект ковров в компании Savaks, сделали за один день, качество на высоте,
            крепления под оригинальные липучки. При стоимости 2990, что почти в четыре раза дешевле
            оригинального комплекта, считаю данный вариант очень хорошим предложением. Качество на
            уровне.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
