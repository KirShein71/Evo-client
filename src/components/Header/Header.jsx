import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import BasketContext from '../../context/BasketContext';
import { Twirl as Hamburger } from 'hamburger-react';
import { observer } from 'mobx-react';
import Burger from '../Burger/Burger';

import './styles.scss';

const Header = observer(() => {
  const basketProduct = React.useContext(BasketContext);
  const [isOpen, setOpen] = React.useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  // В вашем useEffect добавьте следующий код
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <div style={{ display: 'flex' }}>
            <Burger isOpen={isOpen} toggleMenu={toggleMenu} />
            <div className="header__logo">
              <Link to="/">
                <img src="./img/savaks.jpg" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="header__information">
            <a className="header__phone" href="tel:+79618080539">
              8-961-808-0539
            </a>
            <Link to="/basket">
              <div className="header__basket">
                <img src="./img/icon_basket.png" alt="icon_basket" />
                <div>{basketProduct?.count}</div>
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
                    <div className="burger-menu__items">Главная</div>
                    <Link to="/allbrands">
                      <div onClick={() => setOpen(false)} className="burger-menu__items">
                        Каталог
                      </div>
                    </Link>
                    <div className="burger-menu__items">О нас</div>
                    <div className="burger-menu__items">Доставка и оплата</div>
                    <div className="burger-menu__items">Гарантии</div>
                    <div className="burger-menu__items">Полезная информация</div>
                    <div className="burger-menu__items">Контакты</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <NavBar />
      </div>
    </div>
  );
});

export default Header;
