import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { getAllProduct } from '../../../../http/productApi';
import { getAllEdging } from '../../../../http/edgingApi';
import { getAllMaterialRug } from '../../../../http/materailRugApi';
import { getAllProductId } from '../../../../http/trunkApi';
import { getAllProductIdThirdrow } from '../../../../http/thirdrowApi';

import './style.scss';

function Goods({
  selectedProduct,
  setSelectedProduct,
  setSelectedMaterial,
  setSelectedEdging,
  setSelectedSteel,
  setSelectedSaddle,
  setSelectedTrunk,
  setSelectedThirdrow,
  setQuantity,
  setQuantityTrunk,
}) {
  const [products, setProducts] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [edgings, setEdgings] = React.useState([]);
  const [trunks, setTrunks] = React.useState([]);
  const [thirdrows, setThidrows] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    getAllProduct().then((data) => setProducts(data));
    getAllMaterialRug().then((data) => setMaterials(data));
    getAllEdging().then((data) => setEdgings(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProduct(selectedProductId);
  };

  const handleMaterialChange = (e) => {
    const selectedMaterialId = e.target.value;
    setSelectedMaterial(selectedMaterialId);
  };

  const handleEdgingChange = (e) => {
    const selectedEdgingId = e.target.value;
    setSelectedEdging(selectedEdgingId);
  };

  const handleSteelChange = (e) => {
    const isChecked = e.target.checked;
    setSelectedSteel(isChecked ? 1 : 0);
  };

  const handleSaddleChange = (e) => {
    const isChecked = e.target.checked;
    setSelectedSaddle(isChecked ? 1 : 0);
  };

  const handleInputQuantity = (event) => {
    const quantity = event.target.value;
    setQuantity(quantity);
  };

  const handleInputQuantityTrunk = (event) => {
    const quantityTrunk = event.target.value;
    setQuantityTrunk(quantityTrunk);
  };

  React.useEffect(() => {
    if (selectedProduct) {
      getAllProductId(selectedProduct).then((data) => setTrunks(data));
      getAllProductIdThirdrow(selectedProduct).then((data) => setThidrows(data));
    }
  }, [selectedProduct]);

  const handleTrunkChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked && trunks.length > 0) {
      setSelectedTrunk(trunks[0].id);
    } else {
      setSelectedTrunk(null);
    }
  };

  const handleThirdrowChange = (e) => {
    const isChecked = e.target.checked;
    setSelectedThirdrow(isChecked ? thirdrows[0].id : null);
  };

  return (
    <div className="goods">
      <Row className="mb-3">
        <Col>
          <input
            type="text"
            placeholder="Поиск товара"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e)}
            className="goods__search"
          />
          <Form.Select name="product" onChange={(e) => handleProductChange(e)} className="mt-3">
            {products &&
              products
                .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Select name="material" onChange={(e) => handleMaterialChange(e)}>
            <option value="">Цвет материала</option>
            {materials &&
              materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Select name="edging" onChange={(e) => handleEdgingChange(e)}>
            <option value="">Цвет Канта</option>
            {edgings.map((edging) => (
              <option key={edging.id} value={edging.id}>
                {edging.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Check
            type="switch"
            id="saddle-switch"
            label="Алюминевый подпятник, цена: 490"
            onChange={(e) => handleSaddleChange(e)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Check
            type="switch"
            id="steel-switch"
            label="Стальной Z, цена: 790"
            onChange={(e) => handleSteelChange(e)}
          />
        </Col>
      </Row>
      {thirdrows.length > 0 ? (
        <>
          <div>Если клиенту нужно 2 ряда, ничего делать не надо</div>
          <Row className="mb-3">
            <Col>
              <Form.Check
                type="switch"
                id="thirdrow-switch"
                label="3 ряда, цена: 3490"
                onChange={(e) => handleThirdrowChange(e)}
              />
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
      <div>Количество ковриков в салон</div>
      <Row className="mb-3">
        <Col>
          <Form.Control
            onChange={(e) => handleInputQuantity(e)}
            placeholder="Количество"
            className="mb-3"
          />
        </Col>
      </Row>
      {trunks?.length > 0 ? (
        <>
          <Row className="mb-3">
            <Col>
              <Form.Check
                type="switch"
                id="trunk-switch"
                label="Коврик в багажник, цена: 2090"
                onChange={(e) => handleTrunkChange(e)}
              />
            </Col>
          </Row>
          <div>Количество ковриков в багажник</div>
          <Row className="mb-3">
            <Col>
              <Form.Control
                onChange={(e) => handleInputQuantityTrunk(e)}
                placeholder="Количество"
                className="mb-3"
              />
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Goods;
