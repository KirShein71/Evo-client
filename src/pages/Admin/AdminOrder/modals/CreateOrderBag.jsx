import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { createOrderBag } from '../../../../http/orderApi';
import { getAllBag, getAllBagMaterial, getAllBagSize } from '../../../../http/bagApi';

const defaultValue = {
  bag: '',
  bagsize: '',
  bagmaterial: '',
  quantyti: '',
};
const defaultValid = {
  bag: null,
  bagsize: null,
  bagmaterial: null,
  quantyti: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'bag') result.bag = value.bag;
    if (key === 'bagsize') result.bagsize = value.bagsize;
    if (key === 'bagmaterial') result.bagmaterial = value.bagmaterial;
    if (key === 'quantity') result.quantity = value.quantity;
  }
  return result;
};

const CreateOrderBag = (props) => {
  const { show, setShow, setChange, orderId } = props;
  const [bags, setBags] = React.useState([]);
  const [bagsizes, setBagsizes] = React.useState([]);
  const [bagmaterials, setBagmaterials] = React.useState([]);
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [bagsData, bagMaterialsData, bagSizesData] = await Promise.all([
          getAllBag(),
          getAllBagMaterial(),
          getAllBagSize(),
        ]);

        setBags(bagsData);
        setBagmaterials(bagMaterialsData);
        setBagsizes(bagSizesData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.bag && correct.bagmaterial && correct.bagsize && correct.quantity) {
      const data = new FormData();
      data.append('bagId', value.bag);
      data.append('bagmaterialId', value.bagmaterial);
      data.append('bagsizeId', value.bagsize);
      data.append('quantity', value.quantity);
      data.append('orderId', orderId);

      createOrderBag(data)
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
        <Modal.Title>Добавить органайзер</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="bag"
                value={value.bag}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.bag === true}
                isInvalid={valid.bag === false}>
                <option value="">Органайзер</option>
                {bags &&
                  bags.map((bag) => (
                    <option key={bag.id} value={bag.id}>
                      {bag.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="bagsize"
                value={value.bagsize}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.bagsize === true}
                isInvalid={valid.bagsize === false}>
                <option value="">Размер</option>
                {bagsizes &&
                  bagsizes.map((bagsize) => (
                    <option key={bagsize.id} value={bagsize.id}>
                      {bagsize.size} цена: {bagsize.price}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="bagmaterial"
                value={value.bagmaterial}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.bagmaterial === true}
                isInvalid={valid.bagmaterial === false}>
                <option value="">Материал</option>
                {bagmaterials &&
                  bagmaterials.map((bagmaterial) => (
                    <option key={bagmaterial.id} value={bagmaterial.id}>
                      {bagmaterial.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
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

export default CreateOrderBag;
