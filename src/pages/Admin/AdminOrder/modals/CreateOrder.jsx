import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getAllProduct } from '../../../../http/productApi';
import { getAllEdging } from '../../../../http/edgingApi';
import { getAllMaterialRug } from '../../../../http/materailRugApi';
import { getAllProductId } from '../../../../http/trunkApi';
import { getAllProductIdThirdrow } from '../../../../http/thirdrowApi';
import { adminCreate } from '../../../../http/orderApi';

const defaultValue = {
  name: '',
  phone: '',
  delivery: '',
  city: '',
  region: '',
  product: '',
  material: '',
  cellshape: '',
  edging: '',
  trunk: '',
  thirdrow: '',
  quantity: '',
  quantity_trunk: '',
  organizer: '',
  organizerfifty: '',
  quantity_organizer: '',
  quantity_organizerfifty: '',
  saddle: '',
  steel: '',
};
const defaultValid = {
  name: null,
  phone: null,
  delivery: null,
  city: null,
  region: null,
  product: null,
  material: null,
  cellshape: null,
  edging: null,
  trunk: null,
  thirdrow: null,
  quantity: null,
  quantity_trunk: null,
  organizer: null,
  organizerfifty: null,
  quantity_organizer: null,
  quantity_organizerfifty: null,
  saddle: null,
  steel: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'phone') result.phone = value.phone;
    if (key === 'delivery') result.delivery = value.delivery;
    if (key === 'region') result.region = value.region;
    if (key === 'product') result.product = value.product;
    if (key === 'material') result.material = value.material;
    if (key === 'cellshape') result.cellshape = value.cellshape;
    if (key === 'edging') result.edging = value.edging;
    if (key === 'trunk') result.trunk = value.trunk;
    if (key === 'thirdrow') result.thirdrow = value.thirdrow;
    if (key === 'saddle') result.saddle = value.saddle;
    if (key === 'steel') result.steel = value.steel;
    if (key === 'organizer') result.organizer = value.organizer;
    if (key === 'organizerfifty') result.organizerfifty = value.organizerfifty;
    if (key === 'quantity_organizer') result.quantity_organizer = value.quantity_organizer;
    if (key === 'quantity_organizerfifty')
      result.quantity_organizerfifty = value.quantity_organizerfifty;
    if (key === 'quantity') result.quantity = value.quantity;
    if (key === 'quantity_trunk') result.quantity_trunk = value.quantity_trunk;
  }
  return result;
};

const CreateOrder = (props) => {
  const { show, setShow, setChange } = props;
  const [products, setProducts] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [edgings, setEdgings] = React.useState([]);
  const [trunks, setTrunks] = React.useState([]);
  const [thirdrows, setThidrows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const delivery = [
    {
      id: 1,
      title: 'Самомвывоз',
    },
    {
      id: 2,
      title: 'ТК СДЭК',
    },
    {
      id: 3,
      title: 'Почта России',
    },
  ];
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    getAllProduct().then((data) => setProducts(data));
    getAllMaterialRug().then((data) => setMaterials(data));
    getAllEdging().then((data) => setEdgings(data));
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

  const handleOrganizerChange = (e) => {
    const isChecked = e.target.checked;
    setValue((prevValue) => ({
      ...prevValue,
      organizer: isChecked ? 1 : '',
    }));
  };

  const handleOrganizerFiftyChange = (e) => {
    const isChecked = e.target.checked;
    setValue((prevValue) => ({
      ...prevValue,
      organizerfifty: isChecked ? 1 : '',
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
    if (value.product) {
      getAllProductId(value.product).then((data) => setTrunks(data));
    }
  }, [value.product]);

  React.useEffect(() => {
    if (value.product) {
      getAllProductIdThirdrow(value.product).then((data) => setThidrows(data));
    }
  }, [value.product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.product && correct.material && correct.edging && correct.name && correct.phone) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('phone', value.phone.trim());
      data.append('delivery', value.delivery);
      data.append('region', value.region);
      data.append('city', value.city);
      data.append('productId', value.product);
      data.append('materialId', value.material);
      data.append('cellshapeId', 2);
      data.append('edgingId', value.edging);
      data.append('organizerId', value.organizer === '' ? 0 : 1);
      data.append('organizerfiftyId', value.organizerfifty === '' ? 0 : 1);
      data.append('saddleId', value.saddle === '' ? 0 : 1);
      data.append('steelId', value.steel === '' ? 0 : 1);
      data.append('trunkId', value.trunk === '' ? 0 : value.trunk);
      data.append('thirdrowId', value.thirdrow === '' ? 0 : value.thirdrow);
      data.append('quantity_trunk', value.quantity_trunk === '' ? 0 : value.quantity_trunk);
      data.append(
        'quantity_organizer',
        value.quantity_organizer === '' ? 0 : value.quantity_organizer,
      );
      data.append(
        'quantity_organizerfifty',
        value.quantity_organizerfifty === '' ? 0 : value.quantity_organizerfifty,
      );
      data.append('quantity', value.quantity);

      adminCreate(data)
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
        <Modal.Title>Создать заказ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Поиск продукта"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e)}
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
          <Row className="mb-3">
            <Col>
              <Form.Check
                name="organizer"
                type="switch"
                id="organizer-switch"
                label="Органайзер 40см"
                checked={value.organizer === 1}
                isValid={valid.organizer === true}
                isInvalid={valid.organizer === false}
                onChange={(e) => handleOrganizerChange(e)}
              />
            </Col>
          </Row>
          <div>Количество штук органайзера 40 см</div>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="quantity_organizer"
                value={value.quantity_organizer}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.quantity_organizer === true}
                isInvalid={valid.quantity_organizer === false}
                placeholder="Количество"
                className="mb-3"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Check
                name="organizerfifty"
                type="switch"
                id="organizerfifty-switch"
                label="Органайзер 60см"
                checked={value.organizerfifty === 1}
                isValid={valid.organizerfifty === true}
                isInvalid={valid.organizerfifty === false}
                onChange={(e) => handleOrganizerFiftyChange(e)}
              />
            </Col>
          </Row>
          <div>Количество штук органайзера 60 см</div>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="quantity_organizerfifty"
                value={value.quantity_organizerfifty}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.quantity_organizerfifty === true}
                isInvalid={valid.quantity_organizerfifty === false}
                placeholder="Количество"
                className="mb-3"
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
            <Row className="mb-3">
              <Col>
                <Form.Control
                  name="name"
                  value={value.name}
                  onChange={(e) => handleInputChange(e)}
                  isValid={valid.name === true}
                  isInvalid={valid.name === false}
                  placeholder="Имя"
                  className="mb-3"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  name="phone"
                  value={value.phone}
                  onChange={(e) => handleInputChange(e)}
                  isValid={valid.phone === true}
                  isInvalid={valid.phone === false}
                  placeholder="Начинай с 8"
                  className="mb-3"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Select
                  name="delivery"
                  value={value.delivery}
                  onChange={(e) => handleInputChange(e)}
                  isValid={valid.delivery === true}
                  isInvalid={valid.delivery === false}>
                  <option value="">Способ доставки</option>
                  {delivery &&
                    delivery.map((delivery) => (
                      <option key={delivery.id} value={delivery.id}>
                        {delivery.title}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  name="region"
                  value={value.region}
                  onChange={(e) => handleInputChange(e)}
                  isValid={valid.region === true}
                  isInvalid={valid.region === false}
                  placeholder="Введите регион"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  name="city"
                  value={value.city}
                  onChange={(e) => handleInputChange(e)}
                  isValid={valid.city === true}
                  isInvalid={valid.city === false}
                  placeholder="Введите город"
                />
              </Col>
            </Row>
            <Col>
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrder;
