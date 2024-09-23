import React from 'react';
import {
  getAllRegions,
  getAllCities,
  getAllOffices,
  getRatesPvz,
  getRatesDelivery,
} from '../../http/cdekApi';

import './style.scss';

function Cdek({
  selectedCodePVZ,
  setSelectedCodePVZ,
  selectedCityCode,
  setSelectedCityCode,
  value,
  valid,
  handleChange,
}) {
  const [regions, setRegions] = React.useState([]);
  const [dataLoadedRegion, setDataLoadedRegion] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  const [dataLoadedCity, setDataLoadedCity] = React.useState(false);
  const [offices, setOffices] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedRegionCode, setSelectedRegionCode] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [rates, setRates] = React.useState([]);
  const [dataLoadedRates, setDataLoadedRates] = React.useState(false);
  const delivery = [
    { id: 0, title: 'Самовывоз с пункта выдачи' },
    { id: 1, title: 'Доставка до двери' },
  ];
  const [deliveryMethod, setDeliveryMethod] = React.useState(null);

  React.useEffect(() => {
    getAllRegions().then((data) => {
      setRegions(data);
      setDataLoadedRegion(true);
    });
  }, []);

  const handleRegionChange = (e) => {
    if (dataLoadedRegion) {
      const regionName = e.target.value;
      const selectedRegion = regions.find((region) => region.region === regionName);
      if (selectedRegion) {
        setSelectedRegion(regionName);
        setSelectedRegionCode(selectedRegion.region_code);
      } else {
        alert('Регион не найден');
      }
    }
  };

  const handleDeliveryChange = (event) => {
    const selectedId = event.target.value;
    setDeliveryMethod(selectedId);
  };

  React.useEffect(() => {
    if (selectedRegionCode) {
      getAllCities(selectedRegionCode).then((data) => {
        setCities(data);
        setDataLoadedCity(true);
      });
    }
  }, [selectedRegionCode]);

  const handleCityChange = (e) => {
    if (dataLoadedCity) {
      const cityName = e.target.value;
      const selectedCity = cities.find((city) => city.city === cityName);
      if (selectedCity) {
        setSelectedCity(cityName);
        setSelectedCityCode(selectedCity.code);
      } else {
        alert('Город не найден');
      }
    }
  };

  React.useEffect(() => {
    if (selectedCityCode) {
      getAllOffices(selectedCityCode).then((data) => setOffices(data));
    }
  }, [selectedCityCode]);

  React.useEffect(() => {
    if (selectedCityCode) {
      if (deliveryMethod < 1) {
        getRatesPvz(selectedCityCode).then((data) => {
          setRates(data);
          setDataLoadedRates(true);
          console.log(setDataLoadedRates);
        });
      } else {
        getRatesDelivery(selectedCityCode).then((data) => {
          setRates(data);
          setDataLoadedRates(true);
          console.log(setDataLoadedRates);
        });
      }
    }
  }, [selectedCityCode, deliveryMethod]);

  return (
    <div className="cdek">
      <div className="container">
        <div className="cdek__content">
          <div className="cdek__item">
            <div className="cdek__item-title">Выберите способ доставки</div>
            <select id="deliveryMethod" className="cdek__item-form" onChange={handleDeliveryChange}>
              <option value="">Выберите способ доставки</option>
              {delivery.map((delivery) => (
                <React.Fragment key={delivery.id}>
                  <option value={delivery.id}>{delivery.title}</option>
                </React.Fragment>
              ))}
            </select>
          </div>
          <div className="cdek__item">
            <div className="cdek__item-title">Выберите ваш регион:</div>
            <select
              id="regionSelect"
              className="cdek__item-form"
              value={selectedRegion}
              disabled={!dataLoadedRegion}
              onChange={handleRegionChange}>
              <option value="">Выберите регион</option>
              {regions
                .sort((a, b) => a.region.localeCompare(b.region, 'ru'))
                .map((region) => (
                  <React.Fragment key={region.id}>
                    <option value={region.name}>{region.region}</option>
                  </React.Fragment>
                ))}
            </select>
          </div>
          <div className="cdek__item">
            <div className="cdek__item-title">Выберите город:</div>
            <select
              id="cytiSelect"
              className="cdek__item-form"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!dataLoadedCity}>
              <option value="">Выберите город</option>
              {cities
                .sort((a, b) => a.city.localeCompare(b.city, 'ru'))
                .map((city) => (
                  <React.Fragment>
                    <option value={city.name}>{city.city}</option>
                  </React.Fragment>
                ))}
            </select>
          </div>
          {deliveryMethod === null ? (
            ''
          ) : deliveryMethod < 1 ? (
            <div className="cdek__item">
              <div className="cdek__item-title">Выберите пункт выдачи:</div>
              <select
                id="officeSelect"
                className="cdek__item-form"
                value={selectedCodePVZ}
                onChange={(e) => setSelectedCodePVZ(e.target.value)}
                disabled={!selectedCity}>
                <option value="">Выберите пункт выдачи</option>
                {offices.map((office) => (
                  <React.Fragment key={office.id}>
                    <option value={office.code}>{office.location.address}</option>
                  </React.Fragment>
                ))}
              </select>
            </div>
          ) : (
            <div className="cdek__item">
              <div className="cdek__item-title">Адрес доставки</div>
              <input
                name="street"
                value={value.street}
                onChange={(e) => handleChange(e)}
                isValid={valid.street === true}
                isInvalid={valid.street === false}
                placeholder="Название улицы"
                className="cdek__input"
                required
              />
              <input
                name="home"
                value={value.home}
                onChange={(e) => handleChange(e)}
                isValid={valid.home === true}
                isInvalid={valid.home === false}
                placeholder="Номер дома"
                className="cdek__input"
                required
              />
              <input
                name="flat"
                value={value.flat}
                onChange={(e) => handleChange(e)}
                isValid={valid.flat === true}
                isInvalid={valid.flat === false}
                placeholder="Номер квартиры (необязательно)"
                className="cdek__input"
                required
              />
            </div>
          )}
        </div>
        {selectedCityCode ? (
          <div className="cdek__bottom">
            {rates !== null ? (
              [rates].map((rate) => (
                <div key={rate.id}>
                  {dataLoadedRates ? (
                    <>
                      <div className="cdek__bottom-days">
                        Срок доставки: {rate?.calendar_min}-{rate?.calendar_max} дней
                      </div>
                      <div className="cdek__bottom-price">
                        Стоимость доставки: {rate?.total_sum + 100} рублей
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="cdek__bottom-days">Срок доставки: от 3 дней</div>
                <div className="cdek__bottom-price">Стоимость доставки: от 400 рублей</div>
              </>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Cdek;
