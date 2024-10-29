import React from 'react';
import { signup, login } from '../../http/userApi';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ModalCheckout from '../Checkout/modal/ModalCheckout';

import './style.scss';

function Login({ toggleDrawer, setOpenLogin }) {
  const { user } = React.useContext(AppContext);
  const [clicked, setClicked] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessagePhone, setErrorMessagePhone] = React.useState('');
  const [errorMessagePassword, setErrorMessagePassword] = React.useState('');
  const [registrationAccount, setRegistrationAccount] = React.useState(false);
  const [checkboxConfid, setCheckboxConfid] = React.useState(true);
  const [popupCheckdox, setPopupCheckbox] = React.useState(false);
  const navigate = useNavigate();

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

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleToRegistrationAccout = () => {
    setRegistrationAccount(true);
  };

  const onClosePopupCheckbox = () => {
    setPopupCheckbox(false);
  };

  const handleRegistrationAccount = async (event) => {
    event.preventDefault();

    if (!checkboxConfid) {
      setPopupCheckbox(true);
      return; // Если чекбокс не установлен, выходим из функции
    }

    // Простая валидация
    if (!phone || !password) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    if (phone.length !== 11) {
      setErrorMessagePhone('Номер телефона должен содержать 11 цифр');
      return;
    }
    setErrorMessagePhone('');

    if (password.length < 7) {
      setErrorMessagePassword('Пароль должен содержать минимум 7 символов');
      return;
    }
    setErrorMessagePassword('');

    try {
      const data = await signup(phone, password);

      if (data) {
        setOpenLogin(false);
      } else {
        alert('Ошибка регистрации. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  React.useEffect(() => {
    if (user.isAdmin) navigate('/admin', { replace: true });
    if (user.isUser) navigate('/personal-account', { replace: true });
  }, [navigate, user.isAdmin, user.isUser]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!checkboxConfid) {
      setPopupCheckbox(true);
      return; // Если чекбокс не установлен, выходим из функции
    }

    const data = await login(phone, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate('/admin');
      if (user.isUser) navigate('/login');
      setOpenLogin(false);
    }
  };

  return (
    <div className="login">
      <div className="login__closed">
        <CloseIcon onClick={toggleDrawer(false)} />
      </div>
      <div className="login__title">Введите номер и пароль</div>
      <form onSubmit={registrationAccount ? handleRegistrationAccount : handleLogin}>
        <div className="login__card">
          <div className="login__card-content">
            <Box
              component="form"
              sx={{
                '& > :not(style)': {
                  m: 1,
                  width: {
                    sm: 400,
                    xs: '300px',
                  },
                },
              }}
              noValidate
              autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Номер телефона"
                variant="outlined"
                name="phone"
                value={clicked ? phone : ''}
                onChange={handleInputPhone}
                onClick={handleInputClick}
                placeholder="Введите номер телефона"
              />
            </Box>
            {errorMessagePhone && <div className="login__error">{errorMessagePhone}</div>}
            <Box>
              <FormControl sx={{ m: 1, width: { sm: '400px', xs: '300px' } }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  required
                  onChange={handleInputPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Пароль"
                />
              </FormControl>
            </Box>
            {errorMessagePassword && <div className="login__error">{errorMessagePassword}</div>}
          </div>
        </div>
        <div className="login__checkbox">
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
        {registrationAccount ? (
          <button className="login__button-signup">Регистрация</button>
        ) : (
          <div className="login__bottom">
            <div className="login__buttons">
              <button className="login__button-login" type="submit">
                Войти
              </button>
              <div className="login__signup" onClick={handleToRegistrationAccout}>
                Регистрация
              </div>
            </div>
          </div>
        )}
      </form>
      {popupCheckdox && <ModalCheckout onClosePopup={onClosePopupCheckbox} />}
    </div>
  );
}

export default Login;
