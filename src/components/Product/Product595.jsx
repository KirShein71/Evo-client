import React from 'react';
import { useLocation } from 'react-router-dom';
import { getOneProduct } from '../../http/productApi';
import { getAllProductId } from '../../http/trunkApi';
import { getAllProductIdThirdrow } from '../../http/thirdrowApi';
import { getAllMaterialRug } from '../../http/materailRugApi';
import { getAllEdging } from '../../http/edgingApi';
import { append } from '../../http/basketApi';
import { useNavigate } from 'react-router-dom';
import Saddle from './Saddle/Saddle';
import './styles.scss';
import Organizer from './Organizer/Organizer';
import Loader from '../Loader/Loader';
import ModalRug from './modal/ModalRug';
import Carmat from './Carmat/Carmat';
import Equipment from './Equipment/Equipment';
import Cellshape from './Cellshape/Cellshape';
import Materials from './Materials/Materials';
import Edging from './Edging/Edging';
import Pattern from './Pattern/Pattern';

function Product595() {
  const location = useLocation();
  const originalName = location.state?.originalName;
  const [fetching, setFetching] = React.useState(true);
  const [product, setProduct] = React.useState();
  const [materials, setMaterials] = React.useState([]);
  const [edgings, setEdgings] = React.useState([]);
  const [selectedMaterial, setSelectedMaterial] = React.useState('blacksota');
  const [selectedMaterialId, setSelectedMaterialId] = React.useState(28);
  const [selectedEdging, setSelectedEdging] = React.useState('black');
  const [selectedMaterialName, setSelectedMaterialName] = React.useState('Черный');
  const [selectedEdgingName, setSelectedEdgingName] = React.useState('Черный');
  const [selectedEdgingId, setSelectedEdgingId] = React.useState(13);
  const [selectedSteel, setSelectedSteel] = React.useState(null);
  const [selectedSaddle, setSelectedSaddle] = React.useState(null);
  const [selectedOrganizer, setSelectedOrganizer] = React.useState(null);
  const [selectedOrganizerFifty, setSelectedOrganizerFifty] = React.useState(null);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = React.useState('В корзину');
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  const [trunk, setTrunk] = React.useState();
  const [isSalonChecked, setIsSalonChecked] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isTrunkChecked, setIsTrunkChecked] = React.useState(false);
  const [selectedProductTrunk, setSelectedProductTrunk] = React.useState(null);
  const [thirdrow, setThirdrow] = React.useState();
  const [isThirdrowChecked, setIsThirdrowChecked] = React.useState(false);
  const [selectedProductThirdrow, setSelectedProductThirdrow] = React.useState(null);
  const [isSecondrowChecked, setIsSecondrowChecked] = React.useState(true);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [trunkQuantities, setTrunkQuantities] = React.useState({});

  const [quantity, setQuantity] = React.useState(1);
  const isCountDisabled = quantity <= 1;

  const [trunkQuantity, setTrunkQuantity] = React.useState(1);
  const isCountTrunkDisabled = trunkQuantity <= 1;

  const [organizerQuantity, setOrganizerQuantity] = React.useState(1);
  const isCountOrganizerDisabled = organizerQuantity <= 1;

  const [organizerFiftyQuantity, setOrganizerFiftyQuantity] = React.useState(1);
  const isCountOrganizerFiftyDisabled = organizerFiftyQuantity <= 1;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let productLoaded = false;
    let materialLoaded = false;
    let edgingLoaded = false;
    let trunkLoaded = false;
    let thirdrowLoaded = false;

    const fetchData = async () => {
      const productData = await getOneProduct(originalName);
      setProduct(productData);
      productLoaded = true;

      const MaterialData = await getAllMaterialRug();
      setMaterials(MaterialData);
      materialLoaded = true;

      const edgingData = await getAllEdging();
      setEdgings(edgingData);
      edgingLoaded = true;

      const trunkData = await getAllProductId(productData.id);
      setTrunk(trunkData);
      trunkLoaded = true;

      const thirdrowData = await getAllProductIdThirdrow(productData.id);
      setThirdrow(thirdrowData);
      thirdrowLoaded = true;

      if (productLoaded && materialLoaded && edgingLoaded && trunkLoaded && thirdrowLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, [originalName]);

  const handleSalonCheckboxChange = (productId) => {
    setIsSalonChecked((prev) => !prev);
    if (isSalonChecked) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(productId);
    }
  };

  const handleTrunkCheckboxChange = (trunkId) => {
    setIsTrunkChecked((prev) => !prev);
    if (isTrunkChecked) {
      setSelectedProductTrunk(null);
    } else {
      setSelectedProductTrunk(trunkId);
    }
  };

  const handleMaxTrunkCheckboxChange = (trunkId) => {
    setSelectedProductTrunk(selectedProductTrunk === trunkId ? null : trunkId);
  };

  const handleSecondrowCheckboxChange = () => {
    setIsSecondrowChecked(true);
    setIsThirdrowChecked(false);
  };

  const handleThirdrowCheckboxChange = (thirdrowId) => {
    setIsThirdrowChecked(true);
    setIsSecondrowChecked(false);
    setSelectedProductThirdrow(thirdrowId);
  };

  const clickToCart = (
    productId,
    materialId,
    cellshapeId,
    edgingId,
    trunkId,
    thirdrowId,
    saddleId,
    steelId,
    organizerId,
    organizerfiftyId,
    quantity,
    trunkQuantity,
    organizerQuantity,
    organizerFiftyQuantity,
  ) => {
    if (selectedProductTrunk === null && selectedProduct === null) {
      setPopupOpen(true);
    } else {
      append(
        productId,
        materialId,
        cellshapeId,
        edgingId,
        trunkId,
        thirdrowId,
        saddleId,
        steelId,
        organizerId,
        organizerfiftyId,
        quantity,
        trunkQuantity,
        organizerQuantity,
        organizerFiftyQuantity,
      )
        .then((data) => {
          setIsAddedToCart(true);
          setButtonText('В корзине');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const onClosePopup = () => {
    setPopupOpen(false);
  };

  const goToCart = () => {
    navigate('/basket');
  };

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="product">
      <div className="container">
        <h1 className="product__title">{product?.name}</h1>
        <div className="product__content">
          <div className="product__car">
            <div className="product__car-image">
              <img src={process.env.REACT_APP_IMG_URL + product.image} alt="car mat" />
            </div>
          </div>
          <Cellshape />
          <Carmat
            materials={materials}
            edgings={edgings}
            selectedMaterial={selectedMaterial}
            selectedEdging={selectedEdging}
          />
          <Materials
            materials={materials}
            selectedMaterialName={selectedMaterialName}
            setSelectedMaterialName={setSelectedMaterialName}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            setSelectedMaterialId={setSelectedMaterialId}
          />
          <Edging
            edgings={edgings}
            selectedEdging={selectedEdging}
            setSelectedEdging={setSelectedEdging}
            selectedEdgingName={selectedEdgingName}
            setSelectedEdgingName={setSelectedEdgingName}
            setSelectedEdgingId={setSelectedEdgingId}
          />
          <Equipment
            thirdrow={thirdrow}
            isSalonChecked={isSalonChecked}
            handleSalonCheckboxChange={handleSalonCheckboxChange}
            product={product}
            isSecondrowChecked={isSecondrowChecked}
            handleSecondrowCheckboxChange={handleSecondrowCheckboxChange}
            isThirdrowChecked={isThirdrowChecked}
            handleThirdrowCheckboxChange={handleThirdrowCheckboxChange}
            quantity={quantity}
            setQuantity={setQuantity}
            isCountDisabled={isCountDisabled}
            trunk={trunk}
            isTrunkChecked={isTrunkChecked}
            handleTrunkCheckboxChange={handleTrunkCheckboxChange}
            trunkQuantity={trunkQuantity}
            setTrunkQuantity={setTrunkQuantity}
            isCountTrunkDisabled={isCountTrunkDisabled}
            handleMaxTrunkCheckboxChange={handleMaxTrunkCheckboxChange}
            selectedProductTrunk={selectedProductTrunk}
            trunkQuantities={trunkQuantities}
            setTrunkQuantities={setTrunkQuantities}
          />
          <Pattern
            product={product}
            isSecondrowChecked={isSecondrowChecked}
            isThirdrowChecked={isThirdrowChecked}
            thirdrow={thirdrow}
            trunk={trunk}
            selectedProductTrunk={selectedProductTrunk}
          />
          <Saddle setSelectedSaddle={setSelectedSaddle} setSelectedSteel={setSelectedSteel} />
          <Organizer
            setSelectedOrganizer={setSelectedOrganizer}
            setSelectedOrganizerFifty={setSelectedOrganizerFifty}
            organizerQuantity={organizerQuantity}
            setOrganizerQuantity={setOrganizerQuantity}
            isCountOrganizerDisabled={isCountOrganizerDisabled}
            organizerFiftyQuantity={organizerFiftyQuantity}
            setOrganizerFiftyQuantity={setOrganizerFiftyQuantity}
            isCountOrganizerFiftyDisabled={isCountOrganizerFiftyDisabled}
          />
        </div>
        {popupOpen && <ModalRug onClosePopup={onClosePopup} />}
        <button
          onClick={() => {
            if (isAddedToCart) {
              goToCart();
            } else {
              clickToCart(
                selectedProduct,
                selectedMaterialId,
                selectedEdgingId,
                selectedProductTrunk,
                selectedProductThirdrow,
                selectedSaddle,
                selectedSteel,
                selectedOrganizer,
                selectedOrganizerFifty,
                quantity,
                trunkQuantity,
                organizerQuantity,
                organizerFiftyQuantity,
              );
            }
          }}
          type="button"
          id="product__button"
          className={isAddedToCart ? 'added' : ''}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Product595;
