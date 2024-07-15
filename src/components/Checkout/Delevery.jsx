import React from 'react';
import regions from '../../region.json';
import cites from '../../cites.json';
import './style.scss';
import Cdek from '../Cdek/Cdek';

function Delevery({
  selectedDelevery,
  setSelectedDelevery,
  selectedCity,
  setSelectedCity,
  selectedRegion,
  setSelectedRegion,
  selectedCodePVZ,
  setSelectedCodePVZ,
  selectedCityCode,
  setSelectedCityCode,
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
  const [selectedRegionId, setSelectedRegionId] = React.useState(null);

  const handleRegionChange = (e) => {
    const regionName = e.target.value;
    const selectedRegion = regions.find((region) => region.name === regionName);
    if (selectedRegion) {
      setSelectedRegion(regionName);
      setSelectedRegionId(selectedRegion.id);
    } else {
      alert('Регион не найден');
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

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
          <div className="delevery__region-content">
            <div className="delevery__region-items">
              <div className="delevery__region-title">Выберите ваш регион:</div>
              <select
                id="regionSelect"
                className="delevery__region-form"
                value={selectedRegion}
                onChange={handleRegionChange}>
                <option value="">Выберите регион</option>
                {regions.map((region) => (
                  <React.Fragment key={region.id}>
                    <option value={region.name}>{region.name}</option>
                  </React.Fragment>
                ))}
              </select>
            </div>
            <div>
              <div className="delevery__region-title">Выберите город:</div>
              <select
                id="cytiSelect"
                className="delevery__region-form"
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedRegion}>
                <option value="">Выберите город</option>
                {cites
                  .filter((city) => city.region_id === selectedRegionId)
                  .map((city) => (
                    <React.Fragment>
                      <option value={city.name}>{city.name}</option>
                    </React.Fragment>
                  ))}
              </select>
            </div>
          </div>
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
