import { Spinner } from 'react-bootstrap';
import React from 'react';
import { guestCreate } from '../../http/orderApi';
import { fetchBasket, getAllBasketProduct } from '../../http/basketApi';
import Delevery from './Delevery';
import { Link } from 'react-router-dom';
import Message from './Message';
import './style.scss';

const isValid = (input) => {
  let pattern;
  switch (input.name) {
    case 'name':
      pattern = /^[а-яА-Я\s]+$/i;
      return pattern.test(input.value.trim());
    case 'phone':
      pattern = /^[8]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/i;
      return pattern.test(input.value.trim());
    default:
      return false;
  }
};

const CheckoutList = () => {
  const [fetching, setFetching] = React.useState(true);
  const [basketProduct, setBasketProduct] = React.useState([]);
  const [order, setOrder] = React.useState();
  const [value, setValue] = React.useState({ name: '', phone: '' });
  const [valid, setValid] = React.useState({ name: null, phone: null });
  const form = React.useRef();
  const [clicked, setClicked] = React.useState(false);
  const [isBasketLoaded, setIsBasketLoaded] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [selectedDelevery, setSelectedDelevery] = React.useState(1);
  const [checkboxConfid, setCheckboxConfid] = React.useState(true);

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

  if (fetching) {
    return <Spinner animation="border" />;
  }

  if (order) {
    return <Message />;
  }

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
  };
  const handleInputClick = () => {
    setClicked(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll('.checkout__input');
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });

    setValue({
      name: event.target.name.value.trim(),
      phone: event.target.phone.value.trim(),
    });

    setValid({
      name: isValid(event.target.name),
      phone: isValid(event.target.phone),
    });

    if (valid.name && valid.phone && isBasketLoaded) {
      console.log(basketProduct);
      // Проверяем, что данные корзины загружены
      const body = {
        name: value.name,
        phone: value.phone,
        delivery: selectedDelevery,
        region: selectedRegion,
        city: selectedCity,
        items: basketProduct,
      };
      if (!checkboxConfid) {
        alert('Вы забыли подтвердить согласие на обработку персональных данных');
      } else {
        guestCreate(body)
          .then((data) => {
            setOrder(data);
            setBasketProduct(data);
          })
          .catch((error) => {
            console.error('Ошибка при отправке данных:', error);
          });
      }
    } else {
      console.error('Данные корзины не загружены или неверные данные в форме');
    }
    const formCheck = document.querySelector('.checkout__form');
    formCheck.addEventListener('submit', handleSubmit);
  };

  return (
    <div className="checkout">
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
              required
            />
            <input
              name="phone"
              value={clicked ? value.phone || '8' : ''}
              onChange={(e) => handleChange(e)}
              onClick={handleInputClick}
              isValid={valid.phone === true}
              isInvalid={valid.phone === false}
              placeholder="Введите номер телефона..."
              minlength="10"
              maxlength="11"
              className="checkout__input"
              required
            />
          </div>
          <Delevery
            selectedDelevery={selectedDelevery}
            setSelectedDelevery={setSelectedDelevery}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
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
          <button className="checkout__button" type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutList;
