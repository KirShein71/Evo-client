import React from 'react';
import {
  getAllRegions,
  getAllCities,
  getAllOffices,
  getRates,
  createOrderCdek,
} from '../../http/cdekApi';

function Cdek() {
  const [regions, setRegions] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [offices, setOffices] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedRegionCode, setSelectedRegionCode] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [selectedCityCode, setSelectedCityCode] = React.useState(null);
  const [rates, setRates] = React.useState([]);

  React.useEffect(() => {
    getAllRegions().then((data) => setRegions(data));
  }, []);

  const handleRegionChange = (e) => {
    const regionName = e.target.value;
    const selectedRegion = regions.find((region) => region.region === regionName);
    if (selectedRegion) {
      setSelectedRegion(regionName);
      setSelectedRegionCode(selectedRegion.region_code);
    } else {
      alert('Регион не найден');
    }
  };

  React.useEffect(() => {
    if (selectedRegionCode) {
      getAllCities(selectedRegionCode).then((data) => setCities(data));
    }
  }, [selectedRegionCode]);

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    const selectedCity = cities.find((city) => city.city === cityName);
    if (selectedCity) {
      setSelectedCity(cityName);
      setSelectedCityCode(selectedCity.code);
    } else {
      alert('Город не найден');
    }
  };

  React.useEffect(() => {
    if (selectedCityCode) {
      getAllOffices(selectedCityCode).then((data) => setOffices(data));
    }
  }, [selectedCityCode]);

  React.useEffect(() => {
    if (selectedCityCode) {
      getRates(selectedCityCode).then((data) => setRates(data));
    }
  }, [selectedCityCode]);

  const handleCreateOrder = () => {
    createOrderCdek();
  };

  return (
    <div>
      <div className="container">
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
                {regions
                  .sort((a, b) => a.region.localeCompare(b.region, 'ru'))
                  .map((region) => (
                    <React.Fragment key={region.id}>
                      <option value={region.name}>{region.region}</option>
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
                {cities.map((city) => (
                  <React.Fragment>
                    <option value={city.name}>{city.city}</option>
                  </React.Fragment>
                ))}
              </select>
            </div>
            <div>
              <div className="delevery__region-title">Выберите пункт выдачи:</div>
              <select id="officeSelect" className="delevery__region-form" disabled={!selectedCity}>
                <option value="">Выберите пункт выдачи</option>
                {offices.map((office) => (
                  <React.Fragment>
                    <option value={office.name}>{office.name.replace(/^.*?,\s.*?,\s/, '')}</option>
                  </React.Fragment>
                ))}
              </select>
            </div>
          </div>
          {[rates].map((rate) => (
            <div key={rate.id}>
              <div className="delevery__days">
                {rate.calendar_min}-{rate.calendar_max} дней
              </div>
              <div className="delevery__price">{rate.total_sum} rub</div>
            </div>
          ))}
          <button onClick={handleCreateOrder}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Cdek;
