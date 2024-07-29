import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { observer } from 'mobx-react';
import Burger from '../Burger/Burger';

import './styles.scss';

const Header = observer(() => {
  const { basketProduct } = React.useContext(AppContext);
  const [isOpen, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [openCatalogModal, setOpenCatalogModal] = React.useState(false);
  const catalogRef = React.useRef();
  const initialQuery = '';
  const navigate = useNavigate();

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

  return (
    <div className="header">
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
                  <Link to="/animals">
                    <div className="catalog-modal__item">Коврики для животных</div>
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
          <div className="header__information">
            <div className="header__information-call">
              <div style={{ textAlign: 'right' }}>
                <a className="header__information-call__phone" href="tel:88003012901">
                  8-800-301-29-01
                </a>
              </div>
              <div style={{ textAlign: 'right', marginTop: '-3px' }}>
                <a className="header__information-call__phone" href="tel:88122202909">
                  8-812-220-29-09
                </a>
              </div>
              <div className="header__information-operating">
                <div className="header__information-operating__time">
                  С 09-00 до 18-00 без выходных
                </div>
              </div>
            </div>
            <Link to="/basket">
              <div className="header__basket">
                <img src={`/img/icon_basket.png?v=${Date.now()}`} alt="icon_basket" />
                {!!basketProduct.count && (
                  <div className="header__basket-circle">
                    <div className="header__basket-count">{basketProduct.count}</div>
                  </div>
                )}
              </div>
            </Link>

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
                    <Link to="/animals" onClick={() => setOpen(false)}>
                      <div className="burger-menu__items">Коврики для животных</div>
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
        <div
          className={window.location.pathname === '/' ? 'header__hidden' : 'header__border'}></div>
      </div>
    </div>
  );
});

export default Header;
