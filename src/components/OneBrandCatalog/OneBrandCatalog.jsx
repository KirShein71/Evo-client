import React from 'react';
import CardProduct from '../CardProduct/CardProduct';
import Loader from '../Loader/Loader';
import { getOneBrand } from '../../http/brandApi';
import { getAllProductByBrandId } from '../../http/productApi';
import { getAllCarModelByBrandId } from '../../http/carModelApi';
import { useParams } from 'react-router-dom';

import './styles.scss';

function OneBrandCatalog() {
  const { id } = useParams();
  const [brand, setBrand] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [carModels, setCarModels] = React.useState([]);
  const [selectedCarModelId, setSelectedCarModelId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [openModalModel, setOpenModalModel] = React.useState(false);
  const modelRef = React.useRef();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let brandLoaded = false;
    let productsLoaded = false;
    let carModelsLoaded = false;

    const fetchData = async () => {
      const brandData = await getOneBrand(id);
      setBrand(brandData);
      brandLoaded = true;

      const productsData = await getAllProductByBrandId(id);
      setProducts(productsData);
      productsLoaded = true;

      const carModelsData = await getAllCarModelByBrandId(id);
      setCarModels(carModelsData);
      carModelsLoaded = true;

      if (brandLoaded && productsLoaded && carModelsLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

  React.useEffect(() => {
    const hadleClickOutside = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setOpenModalModel(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutside);

    return () => {
      document.body.removeEventListener('click', hadleClickOutside);
    };
  });

  const handleCarModelClick = (modelId) => {
    setSelectedCarModelId(modelId);
  };

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <div className="onebrandcatalog">
        <div className="container">
          {products.length === 0 ? (
            <div className="onebrandcatalog__text">
              Приносим извинения, что карточки товаров пока не добавлены. Однако, мы всегда готовы
              помочь вам с выбором! Просто позвоните нам, и наши опытные менеджеры с удовольствием
              окажут вам помощь в подборе и консультации по нашему ассортименту
            </div>
          ) : (
            <>
              <h2 className="onebrandcatalog__title">
                {' '}
                Автомобильные коврики для{' '}
                <span className="onebrandcatalog__title-span">{brand?.name}</span>
                {selectedCarModelId &&
                  carModels.find((model) => model.id === selectedCarModelId)?.name}
              </h2>
              <div className="onebrandcatalog-modal">
                <div className="modaldown" ref={modelRef}>
                  <div
                    className="modaldown__container"
                    onClick={() => setOpenModalModel(!openModalModel)}>
                    <div className="modaldown__content">
                      <div className="modaldown__title">Выберите Вашу модель:</div>
                      <div className="modaldown__icon">
                        {openModalModel ? (
                          <img src="../img/up.png" alt="up" />
                        ) : (
                          <img src="../img/down.png" alt="down" />
                        )}
                      </div>
                    </div>
                  </div>
                  {openModalModel && (
                    <div className="modaldown__modal">
                      <div className="modaldown__modal-content">
                        <ul className="modaldown__modal-items">
                          <li
                            className="modaldown__modal-item"
                            onClick={() => {
                              handleCarModelClick(null);
                              setOpenModalModel(false);
                            }}>
                            Все модели
                          </li>
                          {carModels.map((model) => (
                            <div key={model.id}>
                              <li
                                className="modaldown__modal-item"
                                onClick={() => {
                                  handleCarModelClick(model.id);
                                  setOpenModalModel(false);
                                }}>
                                {model.name}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="onebrandcatalog__content">
                <div className="onebrandcatalog__product">
                  {products
                    .filter(
                      (product) =>
                        selectedCarModelId === null || product.carModelId === selectedCarModelId,
                    )
                    .map((product) => (
                      <CardProduct key={product.id} {...product} />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OneBrandCatalog;
