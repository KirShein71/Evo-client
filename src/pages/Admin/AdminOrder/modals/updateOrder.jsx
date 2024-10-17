import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneOrderItem, updateOrder } from '../../../../http/orderApi';
import { getAllMaterialRug } from '../../../../http/materailRugApi';
import { getAllEdging } from '../../../../http/edgingApi';
import { getAllProductId } from '../../../../http/trunkApi';
import { getAllProductIdThirdrow } from '../../../../http/thirdrowApi';

const defaultValue = {
  edgingId: '',
  materialId: '',
  saddleId: '',
  steelId: '',
  trunkId: '',
  thirdrowId: '',
  quantity_trunk: '',
  quantity: '',
};
const defaultValid = {
  edgingId: null,
  materialId: null,
  saddleId: null,
  steelId: null,
  trunkId: null,
  thirdrowId: null,
  quantity_trunk: null,
  quantity: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'edgingId') result.edgingId = value.edgingId;
    if (key === 'materialId') result.materialId = value.materialId;
    if (key === 'saddleId') result.saddleId = value.saddleId;
    if (key === 'steelId') result.steelId = value.steelId;
    if (key === 'trunkId') result.trunkId = value.trunkId;
    if (key === 'thirdrowId') result.thirdrowId = value.thirdrowId;
    if (key === 'quantity_trunk') result.quantity_trunk = value.quantity_trunk;
    if (key === 'quantity') result.quantity = value.quantity;
  }
  return result;
};

const UpdateOrder = (props) => {
  const { id, productId, show, setShow, setChange } = props;
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
            edgingId: data.edgingId,
            materialId: data.materialId,
            steelId: data.steelId,
            saddleId: data.saddleId,
            trunkId: data.trunkId,
            thirdrowId: data.thirdrowId,
          };
          setValue(prod);
          setValid(isValid(prod));
        })
        .catch((error) => alert(error.response.data.message));

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
        trunkId: isChecked ? 0 : 0,
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
    data.append('edgingId', value.edgingId);
    data.append('materialId', value.materialId);
    data.append('saddleId', value.saddleId === null ? 0 : value.saddleId);
    data.append('steelId', value.steelId === null ? 0 : value.steelId);
    data.append('trunkId', value.trunkId === null ? 0 : value.trunkId);
    data.append('thirdrowId', value.thirdrowId === null ? 0 : value.thirdrowId);
    data.append('quantity_trunk', value.quantity_trunk);
    data.append('quantity', value.quantity);

    updateOrder(id, data)
      .then((data) => {
        const prod = {
          quantity: data.quantity,
          quantity_trunk: data.quantity_trunk,
          edgingId: data.edgingId,
          materialId: data.materialId,
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
            <div>Цвет материала</div>
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
            <div>Цвет канта</div>
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
