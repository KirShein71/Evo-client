import React from 'react';
import './style.scss';
import Cdek from '../Cdek/Cdek';
import PostWidget from './PostRus/PostWidget';

function Delevery({
  selectedDelevery,
  setSelectedDelevery,
  setSelectedIndex,
  setSelectedRegion,
  selectedCodePVZ,
  setSelectedCodePVZ,
  selectedCityCode,
  setSelectedCityCode,
  setTariffCode,
  setSelectedLocation,
  value,
  valid,
  handleChange,
}) {
  const delevery = [
    {
      id: 1,
      title: 'Самомвывоз с пункта выдачи компании',
      price: 'Бесплатно',
      description: 'Санкт-Петербург, Боровая 51. Режим работы: Пн-Вск 09:00 - 18:00',
    },
    {
      id: 2,
      title: 'ТК СДЭК - самовывоз с пункта выдачи или доставка до двери',
      price: '400 ₽',
      description:
        'Стоимость доставки может измениться от объема заказа, и точного адреса доставки',
    },
    {
      id: 3,
      title: 'Почта России - самовывоз с пункта выдачи или доставка до двери',
      price: '400 ₽',
      description:
        'Стоимость доставки может измениться от объема заказа, и точного адреса доставки',
    },
  ];

  return (
    <div className="delevery">
      <div className="delevery__title">Способ доставки</div>
      <div className="delevery__content">
        {delevery.map((delevery) => (
          <div
            key={delevery.id}
            className={`delevery__card ${selectedDelevery === delevery.id ? 'active' : ''}`}
            onClick={() => setSelectedDelevery(delevery.id)}>
            <div className="delevery__card-content">
              <div className="delevery__card-title">{delevery.title}</div>
              <div className="delevery__card-price">
                Стоимость от: <span className="delevery__card-span">{delevery.price} </span>
              </div>
              <p className="delevery__card-description">{delevery.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedDelevery === 3 ? (
        <div className="delevery__region">
          <PostWidget setSelectedIndex={setSelectedIndex} setSelectedRegion={setSelectedRegion} />
        </div>
      ) : (
        ''
      )}
      {selectedDelevery === 2 ? (
        <Cdek
          selectedCodePVZ={selectedCodePVZ}
          setSelectedCodePVZ={setSelectedCodePVZ}
          selectedCityCode={selectedCityCode}
          setSelectedCityCode={setSelectedCityCode}
          setTariffCode={setTariffCode}
          setSelectedLocation={setSelectedLocation}
          value={value}
          valid={valid}
          handleChange={handleChange}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default Delevery;
