import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getOneBag, getAllBagSize, getAllBagMaterial } from '../../http/bagApi';
import { appendBag } from '../../http/basketApi';
import Loader from '../Loader/Loader';
import BagImage from './BagImage/BagImage';
import BagPicture from './BagPicture/BagPicture';
import BagMaterials from './BagMaterials/BagMaterials';
import ModalBag from './modal/ModalBag';
import BagSize from './BagSize/BagSize';
import BagText from './BagText/BagText';

import './style.scss';

function BagConstructor() {
  const { originalName } = useParams();
  const bagName = originalName.replace(/(?<!-)-(?!-)/g, ' ').replace(/--/g, '-');
  const [fetching, setFetching] = React.useState(true);
  const [bag, setBag] = React.useState();
  const [bagmaterials, setBagmaterials] = React.useState([]);
  const [selectedBagmaterial, setSelectedBagmaterial] = React.useState('blacksota');
  const [selectedBagmaterialId, setSelectedBagmaterialId] = React.useState(1);
  const [selectedBagmaterialName, setSelectedBagmaterialName] = React.useState('Черный');
  const [bagsizes, setBagsizes] = React.useState([]);
  const [bagSizeChecked, setBagSizeChecked] = React.useState(false);
  const [selectedBagSize, setSelectedBagSize] = React.useState(1);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const [quantity, setQuantity] = React.useState(1);
  const isCountBagSizeDisabled = quantity <= 1;

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let bagLoaded = false;
    let materialLoaded = false;
    let bagSizeLoaded = false;

    const fetchData = async () => {
      const bagData = await getOneBag(bagName);
      setBag(bagData);
      bagLoaded = true;

      const MaterialData = await getAllBagMaterial();
      setBagmaterials(MaterialData);
      materialLoaded = true;

      const bagSizeData = await getAllBagSize();
      setBagsizes(bagSizeData);
      bagSizeLoaded = true;

      if (bagLoaded && materialLoaded && bagSizeLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, [originalName, bagName]);

  const handleBagSazeChange = (bagsizeId) => {
    setBagSizeChecked((prev) => !prev);
    if (bagSizeChecked) {
      setSelectedBagSize(null);
    } else {
      setSelectedBagSize(bagsizeId);
    }
  };

  const clickToCart = (bagId, bagmaterialId, bagsizeId, quantity) => {
    appendBag(bagId, bagmaterialId, bagsizeId, quantity)
      .then((data) => {
        setModalOpen(true);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const closedBagModal = () => {
    setModalOpen(false);
  };

  const goToCart = () => {
    navigate('/basket');
  };

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="bagconstructor">
      <div className="bagconstructor__crumbs">
        <div className="container">
          <div className="bagconstructor__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="bagconstructor__crumbs-item">Главная</div>
            </Link>
            <img className="bagconstructor__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/accessories">
              <div className="bagconstructor__crumbs-item">Автоаксессуары</div>
            </Link>
            <img className="bagconstructor__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            {windowWidth > 460 ? (
              <div className="bagconstructor__crumbs-item__active">{bag.name}</div>
            ) : (
              ''
            )}
          </div>
          {windowWidth <= 460 ? (
            <div className="bagconstructor__crumbs-item__active">{bag.name}</div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="container">
        <h1 className="bagconstructor__title">{bag?.name}</h1>
        <div className="bagconstructor__content">
          <div className="bagconstructor__content-left">
            <BagImage
              selectedBagmaterialId={selectedBagmaterialId}
              bag={bag}
              selectedBagSize={selectedBagSize}
            />
            <BagPicture
              selectedBagmaterialId={selectedBagmaterialId}
              bag={bag}
              selectedBagSize={selectedBagSize}
            />
          </div>
          <div className="bagconstructor__content-right">
            <BagMaterials
              bagmaterials={bagmaterials}
              selectedBagmaterialName={selectedBagmaterialName}
              setSelectedBagmaterialName={setSelectedBagmaterialName}
              selectedBagmaterial={selectedBagmaterial}
              setSelectedBagmaterial={setSelectedBagmaterial}
              setSelectedBagmaterialId={setSelectedBagmaterialId}
            />
            <BagSize
              bagsizes={bagsizes}
              handleBagSazeChange={handleBagSazeChange}
              selectedBagSize={selectedBagSize}
              setSelectedBagSize={setSelectedBagSize}
              bagSizeChecked={bagSizeChecked}
              bagSizeQuantity={quantity}
              setBagSizeQuantity={setQuantity}
              isCountBagSizeDisabled={isCountBagSizeDisabled}
            />
            {modalOpen && (
              <ModalBag
                closedBagModal={closedBagModal}
                bag={bag}
                selectedBagSize={selectedBagSize}
                selectedBagmaterialId={selectedBagmaterialId}
                quantity={quantity}
                bagmaterials={bagmaterials}
                bagsizes={bagsizes}
                goToCart={goToCart}
              />
            )}
            <div className="bagconstructor__content-right__bottom">
              <button
                onClick={() =>
                  clickToCart(bag.id, selectedBagmaterialId, selectedBagSize, quantity)
                }
                type="button"
                id="bagconstructor__button">
                В корзину
              </button>
            </div>
          </div>
        </div>
        <BagText />
      </div>
    </div>
  );
}

export default BagConstructor;
