import React from 'react';
import { getAllBrand } from '../../http/brandApi';
import { getAllCarModelByBrandId } from '../../http/carModelApi';
import { createFeedback } from '../../http/feedback';
import { Link } from 'react-router-dom';
import ModalFeedback from '../Feedback/modal/ModalFeedback';

function DisplayCard() {
  const [brands, setBrands] = React.useState([]);
  const [openBrandModal, setOpenBrandModal] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [brandId, setBrandId] = React.useState();
  const [carModels, setCarModels] = React.useState([]);
  const [openCarModelModal, setOpenCarModelModal] = React.useState(false);
  const [selectedCarModel, setSelectedCarModel] = React.useState('');
  const [carmodelId, setCarmodelId] = React.useState(null);
  const [value, setValue] = React.useState({ phone: '' });
  const [valid, setValid] = React.useState({ phone: null });
  const [feedback, setFeedback] = React.useState();
  const form = React.useRef();
  const [clicked, setClicked] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [modalFeedback, setModalFeedback] = React.useState(false);
  const [errorMessagePhone, setErrorMessagePhone] = React.useState('');
  const [errorMessageBrand, setErrorMessageBrand] = React.useState('');
  const [errorMessageModel, setErrorMessageModel] = React.useState('');
  const brandRef = React.useRef();
  const modelRef = React.useRef();

  React.useEffect(() => {
    getAllBrand().then((data) => setBrands(data));
  }, []);

  React.useEffect(() => {
    if (brandId) {
      getAllCarModelByBrandId(brandId).then((data) => setCarModels(data));
    }
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

  const isValid = (input) => {
    let pattern;
    switch (input.phone) {
      case 'phone':
        pattern = /^[8]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/i;
        return pattern.test(input.value.trim());
      default:
        return false;
    }
  };

  const handleInputClick = () => {
    if (!clicked) {
      setClicked(true);
      setPhone('8');
    }
  };

  const handleInputPhone = (event) => {
    const regex = /^[0-9]*$/;
    if (event.target.value.length <= 11 && regex.test(event.target.value)) {
      setPhone(event.target.value);
      setValue({ ...value, phone: event.target.value });

      // Сбрасываем состояние валидации при вводе
      setValid({ ...valid, phone: true });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true); // Устанавливаем флаг отправки

    if (phone.length !== 11) {
      setErrorMessagePhone('Номер телефона должен содержать 11 цифр');
      return;
    }
    setErrorMessagePhone('');

    if (selectedBrand === '') {
      setErrorMessageBrand('Вы не выбрали марку автомобиля');
      return;
    }
    setErrorMessageBrand('');

    if (selectedCarModel === '') {
      setErrorMessageModel('Вы не выбрали модель автомобиля');
      return;
    }
    setErrorMessageModel('');

    const correct = {
      phone: isValid({ name: 'phone', value: value.phone }),
    };

    setValid(correct);

    const data = new FormData();
    data.append('phone', value.phone.trim());
    data.append('brandId', brandId);
    data.append('carModelId', carmodelId);

    createFeedback(data)
      .then((data) => {
        setFeedback(data);
        setValue({ phone: '' });
        setValid({ phone: null });
        setClicked(false);
        setPhone('');
        setSelectedBrand('');
        setSelectedCarModel('');
        setModalFeedback(true);
        setTimeout(() => {
          setModalFeedback(false);
        }, 2000);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div>
      <div className="display-card">
        <div className="display-card__content">
          <h3 className="display-card__title">Получите скидку от 600 рублей</h3>
          <form className="display-card__inputs" ref={form} noValidate onSubmit={handleSubmit}>
            <div style={{ position: 'relative' }}>
              <input
                className={`display-card__number ${valid.phone === false ? 'invalid' : ''}`}
                name="phone"
                value={clicked ? phone : ''}
                onChange={handleInputPhone}
                onClick={handleInputClick}
                isValid={valid.phone === true}
                isInvalid={valid.phone === false}
                placeholder="Ваш телефон"
              />
              {errorMessagePhone && <div className="display-card__error">{errorMessagePhone}</div>}
            </div>
            <div
              className="display-card__brand"
              ref={brandRef}
              onClick={() => setOpenBrandModal(!openBrandModal)}>
              <div className="display-card__brand-content">
                <div className="display-card__brand-title">
                  {selectedBrand || 'Марка автомобиля'}
                </div>
                <div className="display-card__brand-icon">
                  {openBrandModal ? (
                    <img src="../img/up.png" alt="up" />
                  ) : (
                    <img src="../img/down.png" alt="down" />
                  )}
                </div>
              </div>
              {errorMessageBrand && <div className="display-card__error">{errorMessageBrand}</div>}
              {openBrandModal && (
                <div className="brand-modal">
                  <div className="brand-modal__content">
                    <div className="brand-modal__items">
                      {brands.map((brand) => (
                        <div key={brand.id}>
                          <div
                            className="brand-modal__item"
                            onClick={() => {
                              setSelectedBrand(brand.name);
                              setSelectedCarModel('');
                              setBrandId(brand.id);
                              setOpenBrandModal(false);
                            }}>
                            {brand.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="display-card__model">
              <div
                className="display-card__model-container"
                onClick={() => setOpenCarModelModal(!openCarModelModal)}>
                <div className="display-card__model-content">
                  <div className="display-card__model-title">
                    {selectedCarModel || 'Модель автомобиля'}
                  </div>
                  <div className="display-card__model-icon">
                    {openCarModelModal ? (
                      <img src="../img/up.png" alt="up" />
                    ) : (
                      <img src="../img/down.png" alt="down" />
                    )}
                  </div>
                </div>
              </div>
              {errorMessageModel && <div className="display-card__error">{errorMessageModel}</div>}
              {openCarModelModal && (
                <div className="model-modal">
                  <div className="model-modal__content">
                    <div className="model-modal__items">
                      {carModels.map((carModel) => (
                        <div key={carModel.id}>
                          <div
                            className="model-modal__item"
                            onClick={() => {
                              setSelectedCarModel(carModel.name);
                              setOpenCarModelModal(false);
                              setCarmodelId(carModel.id);
                            }}>
                            {carModel.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="display-card__agreement">
              Нажимая кнопку «Получить скидку», я подтверждаю свое согласие на{' '}
              <Link to="/confidentiality">обработку персональных данных</Link>
            </p>
            {modalFeedback && <ModalFeedback />}
            <button className="display-card__button" type="submit">
              Получить скидку!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
