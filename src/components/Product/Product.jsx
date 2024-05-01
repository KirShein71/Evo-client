import React from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../../http/productApi';
import { getAllProductId } from '../../http/trunkApi';
import { getAllMaterialRug } from '../../http/materailRugApi';
import { getAllEdging } from '../../http/edgingApi';
import { getAllCellShape } from '../../http/cellShapeApi';
import { getAllBody } from '../../http/bodyApi';
import { append } from '../../http/basketApi';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

function Product() {
  const { id } = useParams();

  const [product, setProduct] = React.useState();
  const [materials, setMaterials] = React.useState([]);
  const [edgings, setEdgings] = React.useState([]);
  const [cellshapes, setCellshapes] = React.useState([]);
  const [bodies, setBodies] = React.useState([]);
  const [selectedMaterial, setSelectedMaterial] = React.useState('black');
  const [selectedMaterialId, setSelectedMaterialId] = React.useState(23);
  const [selectedEdging, setSelectedEdging] = React.useState('black');
  const [selectedCellShape, setSelectesCellShape] = React.useState(1);
  const [selectedMaterialName, setSelectedMaterialName] = React.useState('Черный');
  const [selectedEdgingName, setSelectedEdgingName] = React.useState('Черный');
  const [selectedEdgingId, setSelectedEdgingId] = React.useState(13);
  const [selectedBody, setSelectedBody] = React.useState('Хэтчбек');
  const [selectedBodyId, setSelectedBodyId] = React.useState(2);
  const [opendDropdownModal, setOpenDropdownModal] = React.useState(false);
  const bodyRef = React.useRef();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = React.useState('В корзину');
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  const [trunk, setTrunk] = React.useState();
  const [isSalonChecked, setIsSalonChecked] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isTrunkChecked, setIsTrunkChecked] = React.useState(false);
  const [selectedProductTrunk, setSelectedProductTrunk] = React.useState(null);

  const [quantity, setQuantity] = React.useState(1);
  const isCountDisabled = quantity <= 1;

  const [trunkQuantity, setTrunkQuantity] = React.useState(1);
  const isCountTrunkDisabled = trunkQuantity <= 1;

  React.useEffect(() => {
    getOneProduct(id).then((data) => setProduct(data));
    getAllProductId(id).then((data) => setTrunk(data));

    getAllMaterialRug().then((data) => setMaterials(data));
    getAllEdging().then((data) => setEdgings(data));
    getAllCellShape().then((data) => setCellshapes(data));
    getAllBody().then((data) => setBodies(data));
  }, [id]);

  React.useEffect(() => {
    const hadleClickOutside = (e) => {
      if (bodyRef.current && !bodyRef.current.contains(e.target)) {
        setOpenDropdownModal(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutside);

    return () => {
      document.body.removeEventListener('click', hadleClickOutside);
    };
  });

  const handleSalonCheckboxChange = (productId) => {
    setIsSalonChecked(!isSalonChecked);
    setSelectedProduct(productId);
  };

  const handleTrunkCheckboxChange = (trunkId) => {
    setIsTrunkChecked(!isTrunkChecked);
    setSelectedProductTrunk(trunkId);
  };

  const clickToCart = (
    productId,
    materialId,
    cellshapeId,
    edgingId,
    bodyId,
    trunkId,
    quantity,
    trunkQuantity,
  ) => {
    if (productId === null && trunkId === null) {
      alert('Вы забыли выбрать коврик');
    } else {
      append(productId, materialId, cellshapeId, edgingId, bodyId, trunkId, quantity, trunkQuantity)
        .then((data) => {
          setIsAddedToCart(true);
          setButtonText('В корзине');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const goToCart = () => {
    navigate('/basket');
  };

  return (
    <div className="product">
      <div className="product__content">
        <div className="product__content-left">
          <div className="product__content-images">
            {materials.map((imageMaterial) => (
              <div
                key={imageMaterial.id}
                style={{
                  display: imageMaterial.color === selectedMaterial ? 'block' : 'none',
                }}>
                <img
                  className="image_one"
                  src={process.env.REACT_APP_IMG_URL + imageMaterial.image}
                />
              </div>
            ))}
            {edgings.map((imageEdging) => (
              <div
                key={imageEdging.id}
                style={{ display: imageEdging.color === selectedEdging ? 'block' : 'none' }}>
                <img
                  className="image_two"
                  src={process.env.REACT_APP_IMG_URL + imageEdging.image}
                />
              </div>
            ))}
          </div>
          <div className="product__content-equipment">
            <div className="product__content-equipment__title">Выбирите комплектацию</div>
            <div className="product__content-equipment__interior">
              <div className="checkbox">
                <div class="cntr">
                  <label for="cbxSalon" class="label-cbx">
                    <input
                      id="cbxSalon"
                      type="checkbox"
                      class="invisible"
                      checked={isSalonChecked}
                      onChange={() => {
                        handleSalonCheckboxChange(product.id);
                      }}
                    />
                    <div class="checkbox">
                      <svg width="20px" height="20px" viewBox="0 0 20 20">
                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                        <polyline points="4 11 8 15 16 6"></polyline>
                      </svg>
                    </div>
                  </label>
                </div>{' '}
                <span>Комплект ковриков в салон</span>
              </div>
              <div className="product__content-equipment__price">
                <div className="product__content-equipment__oldPrice">
                  {product?.old_price * quantity}
                </div>
                <div className="product__content-equipment__newPrice">
                  {product?.new_price * quantity}
                </div>
              </div>
              <div className="product__content-equipment__quantity">
                <button
                  className="minus"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={isCountDisabled}>
                  <img src="../img/minus.png" alt="minus" />
                </button>
                <div className="product__content-equipment__total">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="plus">
                  <img src="../img/plus.png" alt="plus" />
                </button>
              </div>
            </div>
            <div className="product__content-equipment__trunk">
              {trunk?.map((trunk) => (
                <div key={trunk.id}>
                  <div className="checkbox">
                    <div class="cntr">
                      <label for="cbxTrunk" class="label-cbx">
                        <input
                          id="cbxTrunk"
                          type="checkbox"
                          class="invisible"
                          checked={isTrunkChecked}
                          onChange={() => {
                            handleTrunkCheckboxChange(trunk.id);
                          }}
                        />
                        <div class="checkbox">
                          <svg width="20px" height="20px" viewBox="0 0 20 20">
                            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                            <polyline points="4 11 8 15 16 6"></polyline>
                          </svg>
                        </div>
                      </label>
                    </div>{' '}
                    <span>Коврик в багажник</span>
                  </div>
                  <div className="product__content-equipment__price">
                    <div className="product__content-equipment__oldPrice">
                      {trunk.old_price * trunkQuantity}
                    </div>
                    <div className="product__content-equipment__newPrice">
                      {trunk.new_price * trunkQuantity}
                    </div>
                  </div>
                  <div className="product__content-equipment__quantity">
                    <button
                      className="minus"
                      onClick={() => setTrunkQuantity(trunkQuantity - 1)}
                      disabled={isCountTrunkDisabled}>
                      <img src="../img/minus.png" alt="minus" />
                    </button>
                    <div className="product__content-equipment__total">{trunkQuantity}</div>
                    <button className="plus">
                      <img
                        src="../img/plus.png"
                        alt="plus"
                        onClick={() => setTrunkQuantity(trunkQuantity + 1)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product__content-right">
          <h2 className="product__content-title">{product?.name}</h2>
          <div className="product__content-cell">
            <div className="product__content-cell__title">Форма ячейки</div>
            <div className="product__content-cell__items">
              {cellshapes.map((cellshape) => (
                <div
                  key={cellshape.id}
                  onClick={() => {
                    setSelectesCellShape(cellshape.id);
                  }}>
                  <div
                    className={`product__content-cell__item ${
                      selectedCellShape === cellshape.id ? 'active' : ''
                    }`}>
                    {cellshape.name === 'romb' ? (
                      <img src="../img/romb.png" alt="cellshape__rug" />
                    ) : (
                      <img src="../img/sota.png" alt="cellshape__rug" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="product__content-color">
            <div className="product__content-color__title">
              Цвет материала: {selectedMaterialName}
            </div>
            <div className="product__content-color__items">
              {materials
                .filter((material) => material.cellshapeId === selectedCellShape)
                .map((material) => (
                  <div
                    key={material.id}
                    onClick={() => {
                      setSelectedMaterial(material.color);
                      setSelectedMaterialName(material.name);
                      setSelectedMaterialId(material.id);
                    }}>
                    <div
                      className={`product__content-color__item ${material.color} ${
                        selectedMaterial === material.color ? 'active' : ''
                      }`}
                      style={{ backgroundColor: material.color }}></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="product__content-edging">
            <div className="product__content-edging__title">Цвет канта: {selectedEdgingName}</div>
            <div className="product__content-edging__items">
              {edgings.map((edging) => (
                <div
                  key={edging.id}
                  onClick={() => {
                    setSelectedEdging(edging.color);
                    setSelectedEdgingName(edging.name);
                    setSelectedEdgingId(edging.id);
                  }}>
                  <div
                    className={`product__content-edging__item ${edging.color} ${
                      selectedEdging === edging.color ? 'active' : ''
                    }`}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="product__content-body">
            <div className="product__content-body__title">Выбирите тип кузова</div>
            <div className="dropdown" ref={bodyRef}>
              <div
                className="dropdown__container"
                onClick={() => setOpenDropdownModal(!opendDropdownModal)}>
                <div className="dropdown__content">
                  <div className="dropdown__title">{selectedBody}</div>
                  <div className="dropdown__icon">
                    {opendDropdownModal ? (
                      <img src="../img/up.png" alt="up" />
                    ) : (
                      <img src="../img/down.png" alt="down" />
                    )}
                  </div>
                </div>
              </div>
              {opendDropdownModal && (
                <div className="dropdown__modal">
                  <div className="dropdown__modal-content">
                    <ul className="dropdown__modal-items">
                      {bodies.map((body) => (
                        <div key={body.id}>
                          <li
                            className="dropdown__modal-item"
                            onClick={() => {
                              setSelectedBody(body.name);
                              setSelectedBodyId(body.id);
                              setOpenDropdownModal(false);
                            }}>
                            {body.name}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (isAddedToCart) {
            goToCart();
          } else {
            clickToCart(
              selectedProduct,
              selectedMaterialId,
              selectedCellShape,
              selectedEdgingId,
              selectedBodyId,
              selectedProductTrunk,
              quantity,
              trunkQuantity,
            );
          }
        }}
        type="button"
        id="product__button"
        className={isAddedToCart ? 'added' : ''}>
        {buttonText}
      </button>
    </div>
  );
}

export default Product;
