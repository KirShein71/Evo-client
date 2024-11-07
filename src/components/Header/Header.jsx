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
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ClearIcon from '@mui/icons-material/Clear';

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
  const navigateToBenefits = useNavigate();
  const navigateToReviews = useNavigate();

  const handleClickScrollBenefits = () => {
    const element = document.getElementById('benefits');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickBenefits = () => {
    if (location.pathname !== '/') {
      navigateToBenefits('/');
      setTimeout(() => {
        handleClickScrollBenefits();
      }, 100);
    } else {
      setTimeout(() => {
        handleClickScrollBenefits();
      }, 100);
    }
  };

  const handleClickScrollReviews = () => {
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickReviews = () => {
    if (location.pathname !== '/') {
      navigateToReviews('/');
      setTimeout(() => {
        handleClickScrollReviews();
      }, 100);
    } else {
      setTimeout(() => {
        handleClickScrollReviews();
      }, 100);
    }
  };

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
        <div className="header__bar">
          <div className="header__bar-left">
            <Burger isOpen={isOpen} toggleMenu={toggleMenu} />
            <div className="header__bar-icon">
              <Link to="/">
                <img src={`/img/savaks (1) (1).png?v=${Date.now()}`} alt="logo" />
              </Link>
            </div>
          </div>
          <ul className="header__bar-items">
            <Link to="/allbrands">
              <li className="header__bar-item">EVA коврики</li>
            </Link>
            <Link to="/accessories">
              <li className="header__bar-item">Автоаксессуары</li>
            </Link>
            <Link to="/homeproduct">
              <li className="header__bar-item">Для дома</li>
            </Link>
            <li className="header__bar-item" onClick={handleClickBenefits}>
              О нас
            </li>
            {/* <li className="header__bar-item" onClick={handleClickReviews}>
              Отзывы
            </li> */}
            <Link to="/contacts">
              <li className="header__bar-item">Контакты</li>
            </Link>
          </ul>
          <div className="header__bar-phone">
            <div className="header__bar-phoneIcon">
              <PhoneInTalkOutlinedIcon sx={{ color: '#03142E', fontSize: 30 }} />
            </div>
            <div className="header__bar-talk">
              <a className="header__bar-number" href="tel:89112142878">
                8 911 214 28 78
              </a>
              <p className="header__bar-text">Звонок бесплатный</p>
            </div>
          </div>
          <div className="header__bar-icons">
            <div className="header__phone">
              <a href="tel:89112142878">
                <PhoneInTalkOutlinedIcon sx={{ color: '#000000', fontSize: 30 }} />
              </a>
            </div>
            <div className="header__favorite">
              <div className="header__favorite-icon">
                <Link to="/favorites">
                  <FavoriteBorderOutlinedIcon sx={{ color: '#000000', fontSize: 30 }} />
                </Link>
              </div>
              {!!favoriteProduct.count && (
                <div className="header__favorite-circle">
                  <div className="header__favorite-count">{favoriteProduct.count}</div>
                </div>
              )}
            </div>
            <div className="header__basket">
              <div className="header__basket-icon">
                <Link to="/basket">
                  <ShoppingCartOutlinedIcon sx={{ color: '#000000', fontSize: 30 }} />
                </Link>
              </div>
              {!!basketProduct.count && (
                <div className="header__favorite-circle">
                  <div className="header__favorite-count">{basketProduct.count}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="burger-menu burger-menu__open">
            <div className="burger-menu__icon">
              <ClearIcon onClick={() => setOpen(false)} />
            </div>
            <div className="burger-menu__item">
              <Link to="/" onClick={() => setOpen(false)}>
                <div className="burger-menu__items">Главная</div>
              </Link>
              <Link to="/allbrands" onClick={() => setOpen(false)}>
                <div className="burger-menu__items">Eva коврики</div>
              </Link>
              <Link to="/homeproduct" onClick={() => setOpen(false)}>
                <div className="burger-menu__items">Коврики для дома</div>
              </Link>
              <Link to="/accessories" onClick={() => setOpen(false)}>
                <div className="burger-menu__items">Автоаксессуары</div>
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
    </header>
  );
});

export default Header;
