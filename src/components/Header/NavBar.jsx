import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function NavBar() {
  const [openCatalogModal, setOpenCatalogModal] = React.useState(false);
  const catalogRef = React.useRef();

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
    <div className="navbar">
      <div className="navbar__content">
        <Link to="/">
          <div className="navbar__items">Главная</div>
        </Link>
        <div ref={catalogRef} onClick={hadleOpenCatalogModal} className="navbar__items">
          Каталог
        </div>
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
        <Link to="/about">
          <div className="navbar__items">О нас</div>
        </Link>
        <div className="navbar__items">Доставка и оплата</div>
        <Link to="/guarantees">
          <div className="navbar__items">Гарантии</div>
        </Link>
        <Link to="/contacts">
          <div className="navbar__items">Контакты</div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
