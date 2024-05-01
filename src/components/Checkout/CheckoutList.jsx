import { Container, Spinner } from 'react-bootstrap';
import React from 'react';
import { guestCreate } from '../../http/orderApi';
import { fetchBasket, getAllBasketProduct } from '../../http/basketApi';

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
    return (
      <Container>
        <h1 className="processed__title">Заказ оформлен</h1>
        <p className="processed__text">Наш менеджер скоро позвонит для уточнения деталей.</p>
      </Container>
    );
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
        items: basketProduct,
      };
      console.log(body);
      guestCreate(body)
        .then((data) => {
          setOrder(data);
          setBasketProduct(data);
        })
        .catch((error) => {
          console.error('Ошибка при отправке данных:', error);
        });
    } else {
      console.error('Данные корзины не загружены или неверные данные в форме');
    }
  };

  return (
    <div className="checkout">
      <div className="container">
        <h1 className="checkout__title">Оформление заказа</h1>
        <h3 className="checkout__subtitle">Введите Ваши данные</h3>
        <form className="checkout__form" ref={form} noValidate onSubmit={handleSubmit}>
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
          />
          <button className="checkout__button" type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutList;
