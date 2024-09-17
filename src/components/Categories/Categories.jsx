import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Categories() {
  const catalogs = [
    { img: './img/rug-category.jpg', title: 'Автомобильные EVA коврики', url: '/allbrands' },
    { img: './img/home-category.jpg', title: 'EVA коврики для дома', url: '/homeproduct' },
    { img: './img/bag-category.jpg', title: 'Автоаксессуары', url: '/accessories' },
  ];
  return (
    <div className="categories">
      <div className="container">
        <h3 className="categories__title">Категории товаров</h3>
        <div className="categories__content">
          {catalogs.map((catalog) => (
            <div key={catalog.id} className="categories__card">
              <Link to={catalog.url}>
                <div className="categories__card-image">
                  <img src={catalog.img} alt="rug" />
                  <h4 className="categories__card-title">{catalog.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
