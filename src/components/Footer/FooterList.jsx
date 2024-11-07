import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import './styles.scss';

function Footer() {
  const navigateToBenefits = useNavigate();
  const navigateToReviews = useNavigate();
  const location = useLocation();

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

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__title">
          <Link to="/">
            <img src={`/img/savaks (1) (1).png?v=${Date.now()}`} alt="logo" />
          </Link>
          <div className="footer__phone">
            <div className="footer__phoneIcon">
              <PhoneInTalkOutlinedIcon sx={{ color: '#03142e' }} />
            </div>
            <div className="footer__talk">
              <a className="footer__number" href="tel:89112142878">
                8 911 214 28 78
              </a>
            </div>
          </div>
        </div>
        <div className="footer__menu">
          <Link to="/allbrands">
            <div className="footer__item">Автомобильные коврики</div>
          </Link>
          <Link to="/homeproduct">
            <div className="footer__item">Коврики для дома</div>
          </Link>
          <Link to="/accessories">
            <div className="footer__item">Автоаксессуары</div>
          </Link>
          <Link to="/basket">
            <div className="footer__item">Корзина</div>
          </Link>
          <Link to="/favorites">
            <div className="footer__item">Избранное</div>
          </Link>
        </div>
        <div className="footer__menu">
          <div className="footer__item" onClick={handleClickBenefits}>
            О нас
          </div>

          <Link to="/guarantees">
            <div className="footer__item">Гарантии</div>
          </Link>
          <Link to="/contacts">
            <div className="footer__item">Контакты</div>
          </Link>
          {/* <div className="footer__item" onClick={handleClickReviews}>
            Отзывы
          </div> */}
          <Link to="/login">
            <div className="footer__item">
              <img width={15} src={`./img/admin.png?=v=${Date.now()}`} />
            </div>
          </Link>
          <a
            href="https://wa.me/79112142878"
            class="whatsapp_float"
            target="_blank"
            rel="noopener noreferrer">
            <i class="fa fa-whatsapp whatsapp-icon"></i>
          </a>
        </div>
        <div className="footer__information"></div>
      </div>
    </footer>
  );
}

export default Footer;
