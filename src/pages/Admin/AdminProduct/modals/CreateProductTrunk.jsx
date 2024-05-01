import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createProductTrunk } from '../../../../http/trunkApi';

const defaultValue = {
  old_price: '',
  new_price: '',
};
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

const CreateProductTrunk = (props) => {
  const { show, setShow, setChange, productId } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.old_price && correct.new_price) {
      const data = new FormData();
      data.append('old_price', value.old_price.trim());
      data.append('new_price', value.new_price.trim());
      data.append('productId', productId);

      createProductTrunk(data)
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
        <Modal.Title>Создать коврик для богажника</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mt-3">
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

export default CreateProductTrunk;
