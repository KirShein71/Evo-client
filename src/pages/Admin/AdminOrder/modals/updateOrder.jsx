import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneOrderItem, updateOrder } from '../../../../http/orderApi';
import { getAllMaterialRug } from '../../../../http/materailRugApi';
import { getAllBody } from '../../../../http/bodyApi';
import { getAllEdging } from '../../../../http/edgingApi';
import { getAllProductId } from '../../../../http/trunkApi';
import { getAllProductIdThirdrow } from '../../../../http/thirdrowApi';

const defaultValue = {
  bodyId: '',
  edgingId: '',
  materialId: '',
  organizerId: '',
  organizerfiftyId: '',
  saddleId: '',
  steelId: '',
  trunkId: '',
  thirdrowId: '',
  quantity_trunk: '',
  quantity: '',
  quantity_organizer: '',
  quantity_organizerfifty: '',
};
const defaultValid = {
  bodyId: null,
  edgingId: null,
  materialId: null,
  organizerId: null,
  organizerfiftyId: null,
  saddleId: null,
  steelId: null,
  trunkId: null,
  thirdrowId: null,
  quantity_trunk: null,
  quantity: null,
  quantity_organizer: null,
  quantity_organizerfifty: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'bodyId') result.bodyId = value.bodyId;
    if (key === 'edgingId') result.edgingId = value.edgingId;
    if (key === 'materialId') result.materialId = value.materialId;
    if (key === 'organizerId') result.organizerId = value.organizerId;
    if (key === 'organizerfiftyId') result.organizerfiftyId = value.organizerfiftyId;
    if (key === 'saddleId') result.saddleId = value.saddleId;
    if (key === 'steelId') result.steelId = value.steelId;
    if (key === 'trunkId') result.trunkId = value.trunkId;
    if (key === 'thirdrowId') result.thirdrowId = value.thirdrowId;
    if (key === 'quantity_trunk') result.quantity_trunk = value.quantity_trunk;
    if (key === 'quantity') result.quantity = value.quantity;
    if (key === 'quantity_organizer') result.quantity_organizer = value.quantity_organizer;
    if (key === 'quantity_organizerfifty')
      result.quantity_organizerfifty = value.quantity_organizerfifty;
  }
  return result;
};

const UpdateOrder = (props) => {
  const { id, productId, show, setShow, setChange } = props;
  const [bodyIdes, setbodyIdes] = React.useState(null);
  const [edgings, setEdgings] = React.useState(null);
  const [materials, setMaterials] = React.useState(null);
  const [trunk, setTrunk] = React.useState();
  const [thirdrow, setThidrow] = React.useState();
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOneOrderItem(id)
        .then((data) => {
          const prod = {
            quantity: data.quantity,
            quantity_trunk: data.quantity_trunk,
            bodyId: data.bodyId,
            edgingId: data.edgingId,
            materialId: data.materialId,
            organizerId: data.organizerId,
            organizerfiftyId: data.organizerfiftyId,
            quantity_organizer: data.quantity_organizer,
            quantity_organizerfifty: data.quantity_organizerfifty,
            steelId: data.steelId,
            saddleId: data.saddleId,
            trunkId: data.trunkId,
            thirdrowId: data.thirdrowId,
          };
          setValue(prod);
          setValid(isValid(prod));
        })
        .catch((error) => alert(error.response.data.message));

      getAllBody().then((data) => setbodyIdes(data));
      getAllEdging().then((data) => setEdgings(data));
      getAllMaterialRug().then((data) => setMaterials(data));
    }
  }, [id]);

  React.useEffect(() => {
    if (productId) {
      getAllProductId(productId).then((data) => setTrunk(data));
      getAllProductIdThirdrow(productId).then((data) => setThidrow(data));
    }
  }, [productId]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSaddleChange = (e) => {
    const isChecked = e.target.checked;
    const saddleValue = isChecked ? 1 : 0;
    setValue((prevValue) => ({
      ...prevValue,
      saddleId: saddleValue,
    }));
  };

  const handleSteelChange = (e) => {
    const isChecked = e.target.checked;
    const steelValue = isChecked ? 1 : 0; // Определяем значение для отправки на сервер
    setValue((prevValue) => ({
      ...prevValue,
      steelId: steelValue,
    }));
  };

  const handleOrganizerChange = (e) => {
    const isChecked = e.target.checked;
    const steelValue = isChecked ? 1 : 0; // Определяем значение для отправки на сервер
    setValue((prevValue) => ({
      ...prevValue,
      organizerId: steelValue,
    }));
  };

  const handleOrganizerFiftyChange = (e) => {
    const isChecked = e.target.checked;
    const steelValue = isChecked ? 1 : 0; // Определяем значение для отправки на сервер
    setValue((prevValue) => ({
      ...prevValue,
      organizerfiftyId: steelValue,
    }));
  };

  const handleTrunkChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked && trunk.length > 0) {
      setValue((prevValue) => ({
        ...prevValue,
        trunkId: trunk[0].id,
      }));
    } else {
      setValue((prevValue) => ({
        ...prevValue,
        trunkId: isChecked ? 0 : undefined,
      }));
    }
  };

  const handleThirdrowChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked && thirdrow.length > 0) {
      setValue((prevValue) => ({
        ...prevValue,
        thirdrowId: thirdrow[0].id,
      }));
    } else {
      setValue((prevValue) => ({
        ...prevValue,
        thirdrowId: 0,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);

    const data = new FormData();
    data.append('bodyId', value.bodyId);
    data.append('edgingId', value.edgingId);
    data.append('materialId', value.materialId);
    data.append('organizerId', value.organizerId === null ? 0 : value.organizerId);
    data.append('organizerfiftyId', value.organizerfiftyId === null ? 0 : value.organizerfiftyId);
    data.append('saddleId', value.saddleId === null ? 0 : value.saddleId);
    data.append('steelId', value.steelId === null ? 0 : value.steelId);
    data.append('trunkId', value.trunkId === null ? 0 : value.trunkId);
    data.append('thirdrowId', value.thirdrowId === null ? 0 : value.thirdrowId);
    data.append('quantity_trunk', value.quantity_trunk);
    data.append('quantity', value.quantity);
    data.append('quantity_organizer', value.quantity_organizer);
    data.append('quantity_organizerfifty', value.quantity_organizerfifty);
    updateOrder(id, data)
      .then((data) => {
        const prod = {
          quantity: data.quantity,
          quantity_trunk: data.quantity_trunk,
          quantity_organizer: data.quantity_organizer,
          quantity_organizerfifty: data.quantity_organizerfifty,
          bodyId: data.bodyId,
          edgingId: data.edgingId,
          materialId: data.materialId,
          organizerId: data.organizerId,
          organizerfiftyId: data.organizerfiftyId,
          steelId: data.steelId,
          saddleId: data.saddleId,
          turnkId: data.trunkId,
          thirdrowId: data.thirdrowId,
        };
        setValue(prod);
        setValid(isValid(prod));
        setShow(false);
        setChange((state) => !state);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Редактирование заказа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="bodyId"
                value={value.bodyId}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.bodyId === true}
                isInvalid={valid.bodyId === false}>
                <option value="">Кузов</option>
                {bodyIdes &&
                  bodyIdes.map((bodyId) => (
                    <option key={bodyId.id} value={bodyId.id}>
                      {bodyId.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="edgingId"
                value={value.edgingId}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.edgingId === true}
                isInvalid={valid.edgingId === false}>
                <option value="">Цвет канта</option>
                {edgings &&
                  edgings.map((edging) => (
                    <option key={edging.id} value={edging.id}>
                      {edging.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="materialId"
                value={value.materialId}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.materialId === true}
                isInvalid={valid.materialId === false}>
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
              <Form.Check
                name="saddleId"
                type="switch"
                id="saddle-switch"
                label="Алюминевый подпятник"
                checked={value.saddleId === 1}
                onChange={(e) => handleSaddleChange(e)}
                isValid={valid.saddleId === true}
                isInvalid={valid.saddleId === false}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Check
                name="steelId"
                type="switch"
                id="steel-switch"
                label="Стальной Z"
                checked={value.steelId === 1}
                isValid={valid.steelId === true}
                isInvalid={valid.steelId === false}
                onChange={(e) => handleSteelChange(e)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Check
                name="organizerId"
                type="switch"
                id="steel-switch"
                label="Органайзер 40см"
                checked={value.organizerId === 1}
                isValid={valid.organizerId === true}
                isInvalid={valid.organizerId === false}
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
                name="organizerfiftyId"
                type="switch"
                id="organizerfifty-switch"
                label="Органайзер 60см"
                checked={value.organizerfiftyId === 1}
                isValid={valid.organizerfiftyId === true}
                isInvalid={valid.organizerfiftyId === false}
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
          {trunk?.length > 0 ? (
            <>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    name="trunkId"
                    type="switch"
                    id="trunk-switch"
                    label="Коврик в багажник"
                    checked={value.trunkId}
                    onChange={(e) => handleTrunkChange(e)}
                    isValid={valid.trunkId === true}
                    isInvalid={valid.trunkId === false}
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
          {thirdrow?.length > 0 ? (
            <Row className="mb-3">
              <Col>
                <Form.Check
                  name="thirdrowId"
                  type="switch"
                  id="thirdrow-switch"
                  label="3 ряда"
                  checked={value.thirdrowId}
                  onChange={(e) => handleThirdrowChange(e)}
                  isValid={valid.thirdrowId === true}
                  isInvalid={valid.thirdrowId === false}
                />
              </Col>
            </Row>
          ) : (
            ''
          )}
          <div>Количество ковриков в салон</div>
          <Form.Control
            name="quantity"
            value={value.quantity}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.quantity === true}
            isInvalid={valid.quantity === false}
            className="mb-3"
          />
          <Row className="mt-3">
            <Col>
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrder;
