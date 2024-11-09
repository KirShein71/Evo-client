import React from 'react';
import { getAllBrand } from '../../http/brandApi';
import { getAllCarModelByBrandId } from '../../http/carModelApi';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function SearchSection() {
  const [brands, setBrands] = React.useState([]);
  const [openBrandModal, setOpenBrandModal] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [brandId, setBrandId] = React.useState();
  const [carModels, setCarModels] = React.useState([]);
  const [openCarModelModal, setOpenCarModelModal] = React.useState(false);
  const [selectedCarModel, setSelectedCarModel] = React.useState('');
  const brandRef = React.useRef();
  const modelRef = React.useRef();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchAllBrands = async () => {
      try {
        const data = await getAllBrand();
        setBrands(data);
      } catch (error) {
        console.error('Ошибка при загрузке всех брендов:', error);
        alert('Не удалось загрузить все бренды. Пожалуйста, попробуйте позже.');
      }
    };

    fetchAllBrands();
  }, []);

  React.useEffect(() => {
    const fetchCarModels = async () => {
      if (brandId) {
        try {
          const data = await getAllCarModelByBrandId(brandId);
          setCarModels(data);
        } catch (error) {
          console.error('Ошибка при загрузке моделей автомобилей:', error);
          alert('Не удалось загрузить модели автомобилей. Пожалуйста, попробуйте позже.');
        }
      }
    };

    fetchCarModels();
  }, [brandId]);

  React.useEffect(() => {
    const hadleClickOutside = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) {
        setOpenBrandModal(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setOpenCarModelModal(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutside);

    return () => {
      document.body.removeEventListener('click', hadleClickOutside);
    };
  });

  const handleSearch = () => {
    const query = `${selectedBrand} ${selectedCarModel}`; // Формируем поисковый запрос
    navigate(`/result?query=${query}`); // Переходим на страницу поиска с запросом
  };

  return (
    <div className="searchsection">
      <div className="container">
        <div className="searchsection__title">Подбор ковриков для вашего автомобиля</div>
        <div className="searchsection__forms">
          <div className="searchsection__brand" ref={brandRef}>
            <div
              className="searchsection__brand-container"
              onClick={() => setOpenBrandModal(!openBrandModal)}>
              <div className="searchsection__brand-content">
                <div className="searchsection__brand-title">
                  {selectedBrand || 'Марка автомобиля'}
                </div>
                <div className="searchsection__brand-icon">
                  {openBrandModal ? (
                    <img src="../img/up.png" alt="up" />
                  ) : (
                    <img src="../img/down.png" alt="down" />
                  )}
                </div>
              </div>
            </div>
          </div>
          {openBrandModal && (
            <div className="searchsection__brand-modal">
              <div className="searchsection__brand-modal__content">
                <ul className="searchsection__brand-modal__items">
                  {brands.map((brand) => (
                    <div key={brand.id}>
                      <li
                        className="searchsection__brand-modal__item"
                        onClick={() => {
                          setSelectedBrand(brand.name);
                          setSelectedCarModel('');
                          setBrandId(brand.id);
                          setOpenBrandModal(false);
                        }}>
                        {brand.name}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="searchsection__model" ref={modelRef}>
            <div
              className="searchsection__model-container"
              onClick={() => setOpenCarModelModal(!openCarModelModal)}>
              <div className="searchsection__model-content">
                <div className="searchsection__model-title">
                  {selectedCarModel || 'Модель автомобиля'}
                </div>
                <div className="searchsection__model-icon">
                  {openBrandModal ? (
                    <img src="../img/up.png" alt="up" />
                  ) : (
                    <img src="../img/down.png" alt="down" />
                  )}
                </div>
              </div>
            </div>
          </div>
          {selectedBrand && openCarModelModal && (
            <div className="searchsection__model-modal">
              <div className="searchsection__model-modal__content">
                <ul className="searchsection__model-modal__items">
                  {carModels.map((carModel) => (
                    <div key={carModel.id}>
                      <li
                        className="searchsection__model-modal__item"
                        onClick={() => {
                          setSelectedCarModel(carModel.name);
                          setOpenCarModelModal(false);
                        }}>
                        {carModel.name}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button className="searchsection__button" onClick={handleSearch}>
            Поиск
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
