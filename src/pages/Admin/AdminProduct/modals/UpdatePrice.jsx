import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneProduct, updatePrice } from '../../../../http/productApi';

const defaultValue = { old_price: '', new_price: '' };
const defaultValid = {
  old_price: null,
  new_price: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'old_price') result.old_price = value.old_price.trim() !== '';
    if (key === 'new_price') result.new_price = value.new_price.trim() !== '';
  }
  return result;
};

const UpdatePrice = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOneProduct(id)
        .then((data) => {
          const prod = {
            name: data.name,
          };
          setValue(prod);
          setValid(isValid(prod));
        })
        .catch((error) => alert(error.response.data.message));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.old_price && correct.new_price) {
      const data = new FormData();

      data.append('old_price', value.old_price.trim());
      data.append('new_price', value.new_price.trim());

      updatePrice(id, data)
        .then((data) => {
          const prod = {
            name: data.name,
          };
          setValue(prod);
          setValid(isValid(prod));
          setShow(false);
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Редактирование стоимости товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control
                name="old_price"
                value={value.old_price}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.old_price === true}
                isInvalid={valid.old_price === false}
                placeholder="Старая цена."
                className="mb-3"
              />
            </Col>
            <Col>
              <Form.Control
                name="new_price"
                value={value.new_price}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.new_price === true}
                isInvalid={valid.new_price === false}
                placeholder="Новая цена"
                className="mb-3"
              />
            </Col>
          </Row>
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

export default UpdatePrice;
