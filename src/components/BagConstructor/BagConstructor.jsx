import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getOneBag, getAllBagFifty, getAllBagFourty, getAllBagMaterial } from '../../http/bagApi';
import { appendBag } from '../../http/basketApi';
import Loader from '../Loader/Loader';
import BagImage from './BagImage/BagImage';
import BagMaterials from './BagMaterials/BagMaterials';
import ModalBag from './modal/ModalBag';

import './style.scss';
import BagSize from './BagSize/BagSize';
import BagText from './BagText/BagText';

function BagConstructor() {
  const { originalName } = useParams();
  const bagName = originalName.replace(/(?<!-)-(?!-)/g, ' ').replace(/--/g, '-');
  const [fetching, setFetching] = React.useState(true);
  const [bag, setBag] = React.useState();
  const [bagmaterials, setBagmaterials] = React.useState([]);
  const [selectedBagmaterial, setSelectedBagmaterial] = React.useState('blacksota');
  const [selectedBagmaterialId, setSelectedBagmaterialId] = React.useState(1);
  const [selectedBagmaterialName, setSelectedBagmaterialName] = React.useState('Черный');
  const [bagFourty, setBagFourty] = React.useState([]);
  const [bagFifty, setBagFifty] = React.useState([]);
  const [bagFourtyChecked, setBagFourtyChecked] = React.useState(false);
  const [bagFiftyChecked, setBagFiftyChecked] = React.useState(false);
  const [selectedBagFourty, setSelectedBagFourty] = React.useState(null);
  const [selectedBagFifty, setSelectedBagFifty] = React.useState(null);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = React.useState('В корзину');
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [bagFourtyQuantity, setBagFourtyQuantity] = React.useState(1);
  const isCountBagFourtyDisabled = bagFourtyQuantity <= 1;

  const [bagFiftyQuantity, setBagFiftyQuantity] = React.useState(1);
  const isCountBagFiftyDisabled = bagFiftyQuantity <= 1;

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
    let bagFourtyLoaded = false;
    let bagFiftyLoaded = false;

    const fetchData = async () => {
      const bagData = await getOneBag(bagName);
      setBag(bagData);
      bagLoaded = true;

      const MaterialData = await getAllBagMaterial();
      setBagmaterials(MaterialData);
      materialLoaded = true;

      const bagFourtyData = await getAllBagFourty();
      setBagFourty(bagFourtyData);
      bagFourtyLoaded = true;

      const BagFiftyData = await getAllBagFifty();
      setBagFifty(BagFiftyData);
      bagFiftyLoaded = true;

      if (bagLoaded && materialLoaded && bagFourtyLoaded && bagFiftyLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, [originalName, bagName]);

  const handleBagFourtyChange = (bagfourtyId) => {
    setBagFourtyChecked((prev) => !prev);
    if (bagFourtyChecked) {
      setSelectedBagFourty(null);
    } else {
      setSelectedBagFourty(bagfourtyId);
    }
  };

  const handleBagFiftyChange = (bagfiftyId) => {
    setBagFiftyChecked((prev) => !prev);
    if (bagFiftyChecked) {
      setSelectedBagFifty(null);
    } else {
      setSelectedBagFifty(bagfiftyId);
    }
  };

  const clickToCart = (
    bagId,
    bagmaterialId,
    bagfourtyId,
    bagfiftyId,
    bagFourtyQuantity,
    bagFiftyQuantity,
  ) => {
    if (selectedBagFourty === null && selectedBagFifty === null) {
      setModalOpen(true);
    } else {
      appendBag(bagId, bagmaterialId, bagfourtyId, bagfiftyId, bagFourtyQuantity, bagFiftyQuantity)
        .then((data) => {
          setIsAddedToCart(true);
          setButtonText('В корзине');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const onClosePopup = () => {
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
            <BagImage selectedBagmaterialId={selectedBagmaterialId} bag={bag} />
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
              handleBagFourtyChange={handleBagFourtyChange}
              bagFourtyChecked={bagFourtyChecked}
              bagFourtyQuantity={bagFourtyQuantity}
              setBagFourtyQuantity={setBagFourtyQuantity}
              bagFourty={bagFourty}
              isCountBagFourtyDisabled={isCountBagFourtyDisabled}
              handleBagFiftyChange={handleBagFiftyChange}
              bagFiftyChecked={bagFiftyChecked}
              bagFiftyQuantity={bagFiftyQuantity}
              bagFifty={bagFifty}
              isCountBagFiftyDisabled={isCountBagFiftyDisabled}
              setBagFiftyQuantity={setBagFiftyQuantity}
            />
            {modalOpen && <ModalBag onClosePopup={onClosePopup} />}
            <div className="bagconstructor__content-right__bottom">
              <button
                onClick={() => {
                  if (isAddedToCart) {
                    goToCart();
                  } else {
                    clickToCart(
                      bag.id,
                      selectedBagmaterialId,
                      selectedBagFourty,
                      selectedBagFifty,
                      bagFourtyQuantity,
                      bagFiftyQuantity,
                    );
                  }
                }}
                type="button"
                id="bagconstructor__button"
                className={isAddedToCart ? 'added' : ''}>
                {buttonText}
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
