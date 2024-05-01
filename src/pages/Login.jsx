import { AppContext } from '../context/AppContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { login } from '../http/adminApi';
import { observer } from 'mobx-react-lite';

const Login = observer(() => {
  const { user } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = React.useState(false);
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {
    if (user.isAdmin) navigate('/admin', { replace: true });
  }, [navigate, user.isAdmin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phone = event.target.phone.value.trim();
    const password = event.target.password.value.trim();
    const data = await login(phone, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate('/admin');
    }
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

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '50%' }} className="p-2 mt-5 md-light">
        <h3 className="m-auto">Авторизация</h3>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Control
            className="mt-3"
            name="phone"
            value={clicked ? phone : ''}
            onChange={handleInputPhone}
            onClick={handleInputClick}
            placeholder="Введите номер телефона"
          />
          <Form.Control name="password" className="mt-3" placeholder="Введите ваш пароль..." />
          <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Button type="submit">Войти</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Login;
