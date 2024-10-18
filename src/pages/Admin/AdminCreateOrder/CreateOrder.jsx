import React from 'react';
import Goods from './Goods/Goods';
import { adminCreate } from '../../../http/orderApi';

import './style.scss';
import { Button, Col, Form } from 'react-bootstrap';

function CreateOrder() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [selectedMaterial, setSelectedMaterial] = React.useState(null);
  const [selectedEdging, setSelectedEdging] = React.useState(null);
  const [selectedSteel, setSelectedSteel] = React.useState(0);
  const [selectedSaddle, setSelectedSaddle] = React.useState(0);
  const [selectedTrunk, setSelectedTrunk] = React.useState(null);
  const [selectedThirdrow, setSelectedThirdrow] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [quantityTrunk, setQuantityTrunk] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('productId', selectedProduct);
    data.append('materialId', selectedMaterial);
    data.append('cellshapeId', 2);
    data.append('edgingId', selectedEdging);
    data.append('saddleId', selectedSaddle);
    data.append('steelId', selectedSteel);
    data.append('trunkId', selectedTrunk);
    data.append('thirdrowId', selectedThirdrow);
    data.append('quantity', quantity);
    data.append('quantity_trunk', quantityTrunk);

    adminCreate(data)
      .then((data) => {})
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div className="create-order">
      <div className="container">
        <div className="create-order__content">
          <Form noValidate onSubmit={handleSubmit}>
            <div className="create-order__title">Создание заказа</div>
            <div className="create-order__steps">
              <div className="create-order__step">
                <div className="create-order__steps-title">Выбор товара</div>
                <Goods
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  setSelectedMaterial={setSelectedMaterial}
                  setSelectedEdging={setSelectedEdging}
                  setSelectedSteel={setSelectedSteel}
                  setSelectedSaddle={setSelectedSaddle}
                  setSelectedTrunk={setSelectedTrunk}
                  setSelectedThirdrow={setSelectedThirdrow}
                  setQuantity={setQuantity}
                  setQuantityTrunk={setQuantityTrunk}
                />
              </div>
            </div>
            <Col className="mb-3">
              <Button type="submit">Сохранить</Button>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
