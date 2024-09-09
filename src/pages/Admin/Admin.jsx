import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { logout } from '../../http/adminApi';

function Admin() {
  const { user } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    user.logout();
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <h1>Панель управления</h1>
      <p>Это панель управления магазином для администратора</p>
      <ul>
        <Link to="/adminbrand">
          <li>Создание марки машины</li>
        </Link>
        <Link to="/admincarmodel">
          <li>Создание серии автомобиля</li>
        </Link>
        <Link to="/adminproduct">
          <li>Создание карточки товара</li>
        </Link>
        <Link to="/adminhome">
          <li>Создание карточки товара для дома</li>
        </Link>
        <Link to="/adminanimal">
          <li>Создание карточки товара для животных</li>
        </Link>
        <Link to="/adminbag">
          <li>Создание карточки сумки</li>
        </Link>
        <Link to="/adminmaterialrug">
          <li>Создание цвета материала коврика</li>
        </Link>
        <Link to="/adminedging">
          <li>Создание цвета канта коврика</li>
        </Link>
        <Link to="/adminorder">
          <li>Заказы клиентов</li>
        </Link>
      </ul>
      <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
        Выйти
      </div>
    </Container>
  );
}

export default Admin;
