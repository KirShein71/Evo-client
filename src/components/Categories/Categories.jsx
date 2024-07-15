import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Categories() {
  const catalogs = [
    { img: './img/rug_category.webp', title: 'Автомобильные EVA коврики', url: '/allbrands' },
    { img: './img/home_category.jpg', title: 'EVA коврики для дома', url: '/homeproduct' },
    { img: './img/animal_category.jpg', title: 'EVA коврики для животных', url: '/animals' },
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
