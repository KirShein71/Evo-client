import React from 'react';
import { signup } from '../../http/userApi';

function Login() {
  const [clicked, setClicked] = React.useState(false);
  const [phone, setPhone] = React.useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phone = event.target.phone.value.trim();
    const password = event.target.password.value.trim();

    // Простая валидация
    if (!phone || !password) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const data = await signup(phone, password);
      // Обработка успешной регистрации
      console.log('Регистрация успешна:', data);
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login__card">
          <div className="login__card-content">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="phone"
                  value={clicked ? phone : ''}
                  onChange={handleInputPhone}
                  onClick={handleInputClick}
                  placeholder="Введите номер телефона"
                />
              </div>
              <div>
                <input
                  className="password__input"
                  name="password"
                  type="password"
                  placeholder="Введите ваш пароль"
                  required
                />
              </div>
              <button type="submit">Зарегистрировать</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
