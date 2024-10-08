import { Spinner } from 'react-bootstrap';
import React from 'react';
import { guestCreate } from '../../http/orderApi';
import { fetchBasket, getAllBasketProduct } from '../../http/basketApi';
import Delevery from './Delevery';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import ModalCheckout from './modal/ModalCheckout';
import ModalData from './modal/ModalData';
import emailjs from '@emailjs/browser';

const CheckoutList = () => {
  const [fetching, setFetching] = React.useState(true);
  const [basketProduct, setBasketProduct] = React.useState([]);
  const [order, setOrder] = React.useState();
  const [value, setValue] = React.useState({ name: '', surname: '', phone: '' });
  const [valid, setValid] = React.useState({ name: null, surname: null, phone: null });
  const form = React.useRef();
  const [clicked, setClicked] = React.useState(false);
  const [isBasketLoaded, setIsBasketLoaded] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selectedDelevery, setSelectedDelevery] = React.useState(1);
  const [selectedCodePVZ, setSelectedCodePVZ] = React.useState(null);
  const [selectedCityCode, setSelectedCityCode] = React.useState(null);
  const [tariffCode, setTariffCode] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [checkboxConfid, setCheckboxConfid] = React.useState(true);
  const [totalAmount, setTotalAmount] = React.useState(null);
  const [phone, setPhone] = React.useState('');
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupDataOpen, setPopupDataOpen] = React.useState(false);
  const navigate = useNavigate();

  const isValid = (input) => {
    let pattern;
    switch (input.name) {
      case 'name':
        pattern = /^[а-яА-Яa-zA-Z\s]+$/;
        return pattern.test(input.value.trim());
      case 'surname':
        pattern = /^[а-яА-Яa-zA-Z\s]+$/;
        return pattern.test(input.value.trim());
      case 'phone':
        pattern = /^[8]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/i;
        return pattern.test(input.value.trim());

      default:
        return false;
    }
  };

  React.useEffect(() => {
    fetchBasket()
      .then((data) => {
        const basketId = data.id;
        getAllBasketProduct(basketId).then((item) => {
          setBasketProduct(item);
          setIsBasketLoaded(true); // Устанавливаем, что данные корзины загружены
        });
      })
      .finally(() => setFetching(false));
  }, []);

  React.useEffect(() => {
    // Получение значения из localStorage при монтировании компонента
    const storedTotalAmount = localStorage.getItem('totalAmount');
    if (storedTotalAmount !== null) {
      setTotalAmount(parseFloat(storedTotalAmount)); // Парсим строку в число
    }
  }, []);

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
  };

  const handleInputClick = () => {
    if (!clicked) {
      setClicked(true);
      setPhone('8');
    } else {
      setPhone('8');
    }
  };

  const handleInputPhone = (event) => {
    const regex = /^[0-9]*$/;
    if (event.target.value.length <= 11 && regex.test(event.target.value)) {
      setPhone(event.target.value);
    }
  };

  const checkInputsFilled = () => {
    const inputs = document.querySelectorAll('.checkout__input');
    let allInputsFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allInputsFilled = false;
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });

    return allInputsFilled;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Собираем данные формы
    const newValue = {
      name: event.target.name.value.trim(),
      surname: event.target.surname.value.trim(),
      phone: event.target.phone.value.trim(),
    };

    // Проверяем валидность
    const newValid = {
      name: isValid(event.target.name),
      surname: isValid(event.target.surname),
      phone: isValid(event.target.phone),
    };

    // Проверяем заполненность полей
    const isAllInputsFilled = checkInputsFilled();

    // Проверяем состояние чекбокса
    if (!checkboxConfid) {
      setPopupOpen(true);
      return; // Если чекбокс не установлен, выходим из функции
    }

    // Устанавливаем значения и валидность в состояние
    setValue(newValue);
    setValid(newValid);

    // Проверяем все условия для отправки
    if (
      isAllInputsFilled &&
      newValid.name &&
      newValid.surname &&
      newValid.phone &&
      isBasketLoaded
    ) {
      const body = {
        ...newValue,
        street: value.street,
        home: value.home,
        flat: value.flat,
        delivery: selectedDelevery,
        region: selectedRegion,
        city: selectedIndex,
        citycode: selectedCityCode,
        codepvz: selectedCodePVZ,
        tariffcode: tariffCode,
        location: selectedLocation,
        totalamount: totalAmount,
        items: basketProduct,
      };

      guestCreate(body)
        .then((data) => {
          setOrder(data);
          setBasketProduct(data);
          emailjs
            .sendForm('service_3c8bebb', 'template_4gh7irt', form.current, 'HZCzhNm3DSBzhR_n_')
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              },
            );
        })
        .catch((error) => {
          console.error('Ошибка при отправке данных:', error);
        });
    } else {
      console.error('Данные корзины не загружены или неверные данные в форме');
    }
  };

  const onClosePopup = () => {
    setPopupOpen(false);
  };

  const onClosePopupData = () => {
    setPopupDataOpen(false);
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  if (order) {
    navigate('/thankspage');
  }

  return (
    <div className="checkout">
      <div className="checkout__crumbs">
        <div className="container">
          <div className="checkout__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="checkout__crumbs-item">Главная</div>
            </Link>
            <img className="checkout__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/basket">
              <div className="checkout__crumbs-item">Корзина</div>
            </Link>
            <img className="onebrandcatalog__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            <div className="checkout__crumbs-item__active">Оформление заказа</div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="checkout__title">Оформление заказа</h1>
        <h3 className="checkout__subtitle">Введите Ваши данные</h3>
        <form className="checkout__form" ref={form} noValidate onSubmit={handleSubmit}>
          <div className="checkout__inputs">
            <input
              name="name"
              value={value.name}
              onChange={(e) => handleChange(e)}
              isValid={valid.name === true}
              isInvalid={valid.name === false}
              placeholder="Введите имя..."
              className="checkout__input"
            />
            <input
              name="surname"
              value={value.surname}
              onChange={(e) => handleChange(e)}
              isValid={valid.surname === true}
              isInvalid={valid.surname === false}
              placeholder="Введите фамилию..."
              className="checkout__input"
            />
            <input
              name="phone"
              value={clicked ? phone : ''}
              onChange={handleInputPhone}
              onClick={handleInputClick}
              isValid={valid.phone === true}
              isInvalid={valid.phone === false}
              placeholder="Введите номер телефона..."
              className="checkout__input"
            />
          </div>
          <Delevery
            selectedDelevery={selectedDelevery}
            setSelectedDelevery={setSelectedDelevery}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
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
          <div className="checkout__checkbox">
            <div class="cntr">
              <label for="cbxConfiden" class="label-cbx">
                <input
                  id="cbxConfiden"
                  type="checkbox"
                  class="invisible"
                  checked={checkboxConfid}
                  onChange={() => {
                    setCheckboxConfid(!checkboxConfid);
                  }}
                />
                <div class="checkbox">
                  <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                    <polyline points="4 11 8 15 16 6"></polyline>
                  </svg>
                </div>
              </label>
            </div>{' '}
            <span className="checkout__span">
              Подтверждаю свое согласие на{' '}
              <Link to="/confidentiality">обработку персональных данных</Link>
            </span>
          </div>
          {popupOpen && <ModalCheckout onClosePopup={onClosePopup} />}
          {popupDataOpen && <ModalData onClosePopup={onClosePopupData} />}
          <button className="checkout__button" type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutList;
