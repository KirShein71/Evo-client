import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getAllProduct } from '../../../../http/productApi';
import { getAllEdging } from '../../../../http/edgingApi';
import { getAllMaterialRug } from '../../../../http/materailRugApi';
import { getAllProductId } from '../../../../http/trunkApi';
import { getAllProductIdThirdrow } from '../../../../http/thirdrowApi';
import { createOrderAutoRug } from '../../../../http/orderApi';

const defaultValue = {
  product: '',
  material: '',
  cellshape: '',
  edging: '',
  trunk: '',
  thirdrow: '',
  quantity: '',
  quantity_trunk: '',
  saddle: '',
  steel: '',
};
const defaultValid = {
  product: null,
  material: null,
  cellshape: null,
  edging: null,
  trunk: null,
  thirdrow: null,
  quantity: null,
  quantity_trunk: null,
  saddle: null,
  steel: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'product') result.product = value.product;
    if (key === 'material') result.material = value.material;
    if (key === 'cellshape') result.cellshape = value.cellshape;
    if (key === 'edging') result.edging = value.edging;
    if (key === 'trunk') result.trunk = value.trunk;
    if (key === 'thirdrow') result.thirdrow = value.thirdrow;
    if (key === 'saddle') result.saddle = value.saddle;
    if (key === 'steel') result.steel = value.steel;
    if (key === 'quantity') result.quantity = value.quantity;
    if (key === 'quantity_trunk') result.quantity_trunk = value.quantity_trunk;
  }
  return result;
};

const CreateAutoRug = (props) => {
  const { show, setShow, setChange, orderId } = props;
  const [products, setProducts] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [edgings, setEdgings] = React.useState([]);
  const [trunks, setTrunks] = React.useState([]);
  const [thirdrows, setThidrows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData);

        const materialsData = await getAllMaterialRug();
        setMaterials(materialsData);

        const edgingsData = await getAllEdging();
        setEdgings(edgingsData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSteelChange = (e) => {
    const isChecked = e.target.checked;
    setValue((prevValue) => ({
      ...prevValue,
      steel: isChecked ? 1 : '',
    }));
  };

  const handleSaddleChange = (e) => {
    const isChecked = e.target.checked;
    setValue((prevValue) => ({
      ...prevValue,
      saddle: isChecked ? 1 : '',
    }));
  };

  const handleTrunkChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked && trunks.length > 0) {
      setValue((prevValue) => ({
        ...prevValue,
        trunk: trunks[0].id,
      }));
    } else {
      setValue((prevValue) => ({
        ...prevValue,
        trunk: '',
      }));
    }
  };

  const handleThirdrowChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked && thirdrows.length > 0) {
      setValue((prevValue) => ({
        ...prevValue,
        thirdrow: thirdrows[0].id,
      }));
    } else {
      setValue((prevValue) => ({
        ...prevValue,
        thirdrow: '',
      }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setValue({
      ...value,
      product: selectedProductId,
    });
  };

  React.useEffect(() => {
    const fetchProductId = async () => {
      if (value.product) {
        try {
          const data = await getAllProductId(value.product);
          setTrunks(data);
        } catch (error) {
          console.error('Ошибка при загрузке данных по продукту:', error);
          alert('Не удалось загрузить данные по продукту. Пожалуйста, попробуйте позже.');
        }
      }
    };

    fetchProductId();
  }, [value.product]);

  React.useEffect(() => {
    const fetchThirdRow = async () => {
      if (value.product) {
        try {
          const data = await getAllProductIdThirdrow(value.product);
          setThidrows(data);
        } catch (error) {
          console.error('Ошибка при загрузке третьего ряда:', error);
          alert('Не удалось загрузить данные третьего ряда. Пожалуйста, попробуйте позже.');
        }
      }
    };

    fetchThirdRow();
  }, [value.product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.product && correct.material && correct.edging) {
      const data = new FormData();
      data.append('productId', value.product);
      data.append('materialId', value.material);
      data.append('cellshapeId', 2);
      data.append('edgingId', value.edging);
      data.append('saddleId', value.saddle === '' ? 0 : 1);
      data.append('steelId', value.steel === '' ? 0 : 1);
      data.append('trunkId', value.trunk === '' ? 0 : value.trunk);
      data.append('thirdrowId', value.thirdrow === '' ? 0 : value.thirdrow);
      data.append('quantity_trunk', value.quantity_trunk === '' ? 0 : value.quantity_trunk);
      data.append('quantity', value.quantity);
      data.append('orderId', orderId);

      createOrderAutoRug(data)
        .then((data) => {
          setValue(defaultValue);
          setValid(defaultValid);
          setShow(false);
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Создать заказ на автоковрик</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col className="mb-3">
              <Form.Control
                type="text"
                placeholder="Поиск товара"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e)}
                className="mb-3"
              />
              <Form.Select
                name="product"
                value={value.product}
                onChange={(e) => handleProductChange(e)}
                isValid={valid.product === true}
                isInvalid={valid.product === false}>
                {products &&
                  products
                    .filter((product) =>
                      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
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
              <Form.Select
                name="material"
                value={value.material}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.material === true}
                isInvalid={valid.material === false}>
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
              <Form.Select
                name="edging"
                value={value.edging}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.edging === true}
                isInvalid={valid.edging === false}>
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
                name="saddle"
                type="switch"
                id="saddle-switch"
                label="Алюминевый подпятник"
                checked={value.saddle === 1}
                onChange={(e) => handleSaddleChange(e)}
                isValid={valid.saddle === true}
                isInvalid={valid.saddle === false}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Check
                name="steel"
                type="switch"
                id="steel-switch"
                label="Стальной Z"
                checked={value.steel === 1}
                isValid={valid.steel === true}
                isInvalid={valid.steel === false}
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
                    name="thirdrow"
                    type="switch"
                    id="thirdrow-switch"
                    label="3 ряда"
                    checked={value.thirdrow}
                    onChange={(e) => handleThirdrowChange(e)}
                    isValid={valid.thirdrow === true}
                    isInvalid={valid.thirdrow === false}
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
                name="quantity"
                value={value.quantity}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.quantity === true}
                isInvalid={valid.quantity === false}
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
                    name="trunk"
                    type="switch"
                    id="trunk-switch"
                    label="Коврик в багажник"
                    checked={value.trunk}
                    onChange={(e) => handleTrunkChange(e)}
                    isValid={valid.trunk === true}
                    isInvalid={valid.trunk === false}
                  />
                </Col>
              </Row>
              <div>Количество ковриков в багажник</div>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    name="quantity_trunk"
                    value={value.quantity_trunk}
                    onChange={(e) => handleInputChange(e)}
                    isValid={valid.quantity_trunk === true}
                    isInvalid={valid.quantity_trunk === false}
                    placeholder="Количество"
                    className="mb-3"
                  />
                </Col>
              </Row>
            </>
          ) : (
            ''
          )}
          <Row>
            <Col>
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAutoRug;
