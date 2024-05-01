import React from 'react';
import CardProduct from '../CardProduct/CardProduct';

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

  React.useEffect(() => {
    getOneBrand(id).then((data) => setBrand(data));
    getAllProductByBrandId(id).then((data) => setProducts(data));
    getAllCarModelByBrandId(id).then((data) => {
      setCarModels(data);
    });
  }, [id]);

  const handleCarModelClick = (modelId) => {
    setSelectedCarModelId(modelId);
  };

  return (
    <>
      <div className="onebrandcatalog">
        <div className="container">
          <h2 className="onebrandcatalog__title">
            {' '}
            Автомобильные коврики для{' '}
            <span className="onebrandcatalog__title-span">{brand?.name}</span>
            {selectedCarModelId && carModels.find((model) => model.id === selectedCarModelId)?.name}
          </h2>
          <div className="onebrandcatalog__content">
            <div className="onebrandcatalog__carmodel">
              <ul>
                {carModels.map((model) => (
                  <li
                    key={model.id}
                    className={`onebrandcatalog__carmodel-item  ${
                      model.id === selectedCarModelId ? 'selected' : ''
                    }`}
                    onClick={() => handleCarModelClick(model.id)}>
                    {model.name}
                  </li>
                ))}
              </ul>
            </div>
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
        </div>
      </div>
    </>
  );
}

export default OneBrandCatalog;
