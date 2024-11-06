import React from 'react';
import { Link } from 'react-router-dom';
import { createFeedback } from '../../http/feedback';
import ModalFeedback from './modal/ModalFeedback';
import './style.scss';

function Feedback() {
  const [value, setValue] = React.useState({ name: '', phone: '' });
  const [valid, setValid] = React.useState({ name: null, phone: null });
  const [feedback, setFeedback] = React.useState();
  const form = React.useRef();
  const [clicked, setClicked] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [modalFeedback, setModalFeedback] = React.useState(false);

  const isValid = (input) => {
    let pattern;
    switch (input.name) {
      case 'name':
        pattern = /^[а-яА-Яa-zA-Z\s]+$/;
        return pattern.test(input.value.trim());
      case 'phone':
        pattern = /^[8]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/i;
        return pattern.test(input.value.trim());
      default:
        return false;
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
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

    const correct = {
      name: isValid({ name: 'name', value: value.name }),
      phone: isValid({ name: 'phone', value: value.phone }),
    };

    setValid(correct);
    if (correct.name && correct.phone) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('phone', value.phone.trim());

      createFeedback(data)
        .then((data) => {
          setFeedback(data);
          setValue({ name: '', phone: '' });
          setValid({ name: null, phone: null });
          setClicked(false);
          setPhone('');
          setModalFeedback(true);
          setTimeout(() => {
            setModalFeedback(false);
          }, 2000);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <div className="feedback" id="feedback">
      <div className="container">
        <div className="feedback__content">
          <div className="feedback__card">
            <h3 className="feedback__card-title">Получить скидку</h3>
            <p className="feedback__card-text">
              Менеджер свяжется с Вами и расскажет как получить скидку.
            </p>
            <form className="feedback__card-form" ref={form} noValidate onSubmit={handleSubmit}>
              <div className="feedback__card-inputs">
                <input
                  className={`feedback__card-inputs__name ${
                    valid.name === false && isSubmitted ? 'invalid' : ''
                  }`}
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  isValid={valid.name === true}
                  isInvalid={valid.name === false}
                  placeholder="Ваше имя"
                />
                <input
                  className={`feedback__card-inputs__phone ${
                    valid.phone === false ? 'invalid' : ''
                  }`}
                  name="phone"
                  value={clicked ? phone : ''}
                  onChange={handleInputPhone}
                  onClick={handleInputClick}
                  isValid={valid.phone === true}
                  isInvalid={valid.phone === false}
                  placeholder="Ваш телефон"
                />
              </div>
              {modalFeedback && <ModalFeedback />}
              <button className="feedback__card-button" type="submit">
                Получить скидку
              </button>
            </form>
            <p className="feedback__card-agreement">
              Нажимая кнопку «Получить скидку», я подтверждаю свое согласие на{' '}
              <Link to="/confidentiality">обработку персональных данных</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
