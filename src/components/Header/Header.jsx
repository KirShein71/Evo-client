import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { observer } from 'mobx-react';
import Burger from '../Burger/Burger';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Login from '../Login/Login';

import './styles.scss';

const Header = observer(() => {
  const { basketProduct, favoriteProduct, user } = React.useContext(AppContext);
  const [isOpen, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [openCatalogModal, setOpenCatalogModal] = React.useState(false);
  const catalogRef = React.useRef();
  const initialQuery = '';
  const navigate = useNavigate();
  const navigateToFeedback = useNavigate();
  const location = useLocation();
  const [openLogin, setOpenLogin] = React.useState({ right: false });

  const toggleMenu = () => {
    setOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/result?query=${query}`);
    setQuery(initialQuery);
  };

  const hadleOpenCatalogModal = () => {
    setOpenCatalogModal(!openCatalogModal);
  };

  React.useEffect(() => {
    const hadleClickOutside = (e) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target)) {
        setOpenCatalogModal(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutside);

    return () => {
      document.body.removeEventListener('click', hadleClickOutside);
    };
  });

  const handleClickScroll = () => {
    const element = document.getElementById('feedback');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickFeedback = () => {
    if (location.pathname !== '/') {
      navigateToFeedback('/');
      setTimeout(() => {
        handleClickScroll();
      }, 100);
    } else {
      setTimeout(() => {
        handleClickScroll();
      }, 100);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenLogin({ ...openLogin, right: open });
  };

  const handleUserImageClick = (event) => {
    if (!user.isAdmin && !user.isUser) {
      toggleDrawer(true)(event);
    } else {
      if (user.isAdmin) {
        navigate('/admin', { replace: true });
      } else if (user.isUser) {
        navigate('/personal-account', { replace: true });
      }
    }
    console.log(user);
  };

  const DrawerList = ({ toggleDrawer }) => (
    <Box
      sx={{
        width: {
          xs: '100%', // 100% для экранов меньше 460px
          sm: 450, // 550px для экранов 460px и больше
        },
      }}
      role="presentation">
      <List>
        <Login toggleDrawer={toggleDrawer} setOpenLogin={setOpenLogin} />
      </List>
      <Divider />
    </Box>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__left">
            <Burger isOpen={isOpen} toggleMenu={toggleMenu} />
            <div className="header__logo">
              <Link to="/">
                <img src={`/img/savaks (1) (1).png?v=${Date.now()}`} alt="logo" />
              </Link>
            </div>
          </div>
          <div>
            <button className="header__catalog" ref={catalogRef} onClick={hadleOpenCatalogModal}>
              Каталог товаров
            </button>
            {openCatalogModal && (
              <div className="catalog-modal">
                <div className="catalog-modal__content">
                  <Link to="/allbrands">
                    <div className="catalog-modal__item">Коврики для автомобилей</div>
                  </Link>
                  <Link to="/homeproduct">
                    <div className="catalog-modal__item">Коврики для дома</div>
                  </Link>
                  <Link to="/accessories">
                    <div className="catalog-modal__item">Автоаксессуары</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="header__search">
            <form className="header__form" onSubmit={handleSubmit}>
              <input
                className="header__input"
                placeholder="Поиск..."
                value={query}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="header__icons">
            {/* <div className="header__feedback">
                <div className="header__feedback" onClick={handleClickFeedback}>
                  <img src={`/img/feedback.png?v=${Date.now()}`} alt="icon_feedback" />
                </div>
                <div className="header__user-feedback">Почта</div>
              </div> */}
            <div className="header__phone">
              <div className="header__phone-image">
                <a href="tel:88003012901">
                  <img src={`/img/phone.png?v=${Date.now()}`} alt="icon_user" />
                </a>
              </div>
              <div className="header__phone-title">Телефон</div>
            </div>
            <div className="header__user">
              <div className="header__user-image" onClick={handleUserImageClick}>
                <img src={`/img/user_icon.png?v=${Date.now()}`} alt="icon_user" />
              </div>
              {user.isUser || user.isAdmin ? (
                <div className="header__user-title">Профиль</div>
              ) : (
                <div className="header__user-title">Войти</div>
              )}
              <Drawer anchor="right" open={openLogin.right} onClose={toggleDrawer(false)}>
                <DrawerList toggleDrawer={toggleDrawer} />
              </Drawer>
            </div>

            <div className="header__favorite">
              <div className="header__favorite-content">
                <div className="header__favorite-image">
                  <Link to="/favorites">
                    <img src={`/img/heart.png?v=${Date.now()}`} alt="favorite icon" />
                  </Link>
                </div>

                {!!favoriteProduct.count && (
                  <div className="header__favorite-circle">
                    <div className="header__favorite-count">{favoriteProduct.count}</div>
                  </div>
                )}
              </div>
              <div className="header__favorite-title">Избранное</div>
            </div>
            <div className="header__basket">
              <div className="header__basket-content">
                <Link to="/basket">
                  <div className="header__basket-image">
                    <img src={`/img/cart.png?v=${Date.now()}`} alt="icon_basket" />
                  </div>
                </Link>
                {!!basketProduct.count && (
                  <div className="header__basket-circle">
                    <div className="header__basket-count">{basketProduct.count}</div>
                  </div>
                )}
              </div>
              <div className="header__basket-title">Корзина</div>
            </div>
          </div>
          {isOpen && (
            <>
              <div className="overlay"></div>
              <div className="burger-menu burger-menu__open">
                <div className="burger-menu__icon">
                  <img onClick={() => setOpen(false)} src="./img/delete.png" alt="closed" />
                </div>
                <div className="burger-menu__item">
                  <Link to="/" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">Главная</div>
                  </Link>
                  <Link to="/allbrands" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">Автомобильные коврики</div>
                  </Link>
                  <Link to="/homeproduct" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">Коврики для дома</div>
                  </Link>
                  <Link to="/accessories" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">Автоаксессуары</div>
                  </Link>
                  <Link to="/about" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">О нас</div>
                  </Link>
                  <Link to="/guarantees" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">Гарантии</div>
                  </Link>
                  <Link to="/contacts" onClick={() => setOpen(false)}>
                    <div className="burger-menu__items">Контакты</div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
