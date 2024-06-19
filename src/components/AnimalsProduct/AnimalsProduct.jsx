import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneAnimal } from '../../http/animalApi';
import { appendAnimal } from '../../http/basketApi';
import { getAllMaterialForAnimal } from '../../http/materailRugApi';
import { getAllEdging } from '../../http/edgingApi';
import LoaderAnimal from '../LoaderAnimal/LoaderAnimal';
import './style.scss';

function AnimalsProduct() {
  const { id } = useParams();
  const [fetching, setFetching] = React.useState(true);
  const [animal, setAnimal] = React.useState();
  const [materials, setMaterials] = React.useState([]);
  const [selectedMaterial, setSelectedMaterial] = React.useState('blacksota');
  const [selectedMaterialId, setSelectedMaterialId] = React.useState(28);
  const [selectedMaterialName, setSelectedMaterialName] = React.useState('Черный');
  const [edgings, setEdgings] = React.useState([]);
  const [selectedEdgingName, setSelectedEdgingName] = React.useState('Черный');
  const [selectedEdgingId, setSelectedEdgingId] = React.useState(13);
  const [selectedEdging, setSelectedEdging] = React.useState('black');
  const [quantity, setQuantity] = React.useState(1);
  const isCountDisabled = quantity <= 1;
  const navigate = useNavigate();
  const [buttonText, setButtonText] = React.useState('В корзину');
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let animalProductLoaded = false;
    let materialLoaded = false;
    let edgingLoaded = false;

    const fetchData = async () => {
      const animalProductData = await getOneAnimal(id);
      setAnimal(animalProductData);
      animalProductLoaded = true;

      const MaterialData = await getAllMaterialForAnimal();
      setMaterials(MaterialData);
      materialLoaded = true;

      const edgingData = await getAllEdging();
      setEdgings(edgingData);
      edgingLoaded = true;

      if (animalProductLoaded && materialLoaded && edgingLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const clickToCart = (animalId, materialId, edgingId, quantity) => {
    appendAnimal(animalId, materialId, edgingId, quantity)
      .then((data) => {
        setIsAddedToCart(true);
        setButtonText('В корзине');
      })
      .catch((error) => alert(error.response.data.message));
  };

  const goToCart = () => {
    navigate('/basket');
  };

  if (fetching) {
    return <LoaderAnimal />;
  }

  return (
    <div className="animalsproduct">
      <div className="container">
        <div className="animalsproduct__title">{animal?.name}</div>
        <div className="animalsproduct__content">
          <div className="animalsproduct__content-left">
            <div className="animalsproduct__content-image">
              <img src={process.env.REACT_APP_IMG_URL + animal?.image} alt="animals" />
            </div>
          </div>
          <div className="animalsproduct__content-right">
            <div className="animalsproduct__content-color">
              <div className="animalsproduct__content-color__title">
                Цвет коврика: {selectedMaterialName}
              </div>
              <div className="animalsproduct__content-color__items">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => {
                      setSelectedMaterial(material.color);
                      setSelectedMaterialName(material.name);
                      setSelectedMaterialId(material.id);
                    }}>
                    <div
                      className={`animalsproduct__content-color__item ${material.color} ${
                        selectedMaterial === material.color ? 'active' : ''
                      }`}
                      style={{ backgroundColor: material.color }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animalsproduct__content-edging">
              <div className="animalsproduct__content-edging__title">
                Цвет канта: {selectedEdgingName}
              </div>
              <div className="animalsproduct__content-edging__items">
                {edgings.map((edging) => (
                  <div
                    key={edging.id}
                    onClick={() => {
                      setSelectedEdging(edging.color);
                      setSelectedEdgingName(edging.name);
                      setSelectedEdgingId(edging.id);
                    }}>
                    <div
                      className={`animalsproduct__content-edging__item ${edging.color} ${
                        selectedEdging === edging.color ? 'active' : ''
                      }`}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animalsproduct__content-equipment">
              <div className="animalsproduct__content-equipment__title">Выберите количество</div>
              <div className="animalsproduct__content-equipment__interior">
                <div className="animalsproduct__content-equipment__price">
                  <div className="animalsproduct__content-equipment__newPrice">
                    {animal?.new_price * quantity}
                  </div>
                </div>
                <div className="animalsproduct__content-equipment__quantity">
                  <button
                    className="minus"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={isCountDisabled}>
                    <img src="../img/minus.png" alt="minus" />
                  </button>
                  <div className="animalsproduct__content-equipment__total">{quantity}</div>
                  <button className="plus" onClick={() => setQuantity(quantity + 1)}>
                    <img src="../img/plus.png" alt="plus" />
                  </button>
                </div>
              </div>
              <div style={{ marginTop: '25px' }}>
                <button
                  onClick={() => {
                    if (isAddedToCart) {
                      goToCart();
                    } else {
                      clickToCart(animal.id, selectedMaterialId, selectedEdgingId, quantity);
                    }
                  }}
                  type="button"
                  id="animal__button"
                  className={isAddedToCart ? 'added' : ''}>
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalsProduct;
