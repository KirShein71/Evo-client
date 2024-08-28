import React from 'react';
import { signup } from '../../http/userApi';

function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    // Простая валидация
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const data = await signup(email, password);
      // Обработка успешной регистрации
      console.log('Регистрация успешна:', data);
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка регистрации:', error);
      alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
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
                  className="email__input"
                  name="email"
                  placeholder="Введите ваш email"
                  required
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
