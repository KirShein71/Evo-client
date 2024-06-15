import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createProductThirdrow } from '../../../../http/thirdrowApi';

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

const CreateProductThirdrow = (props) => {
  const { show, setShow, setChange, productId } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [image, setImage] = React.useState(null);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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
      data.append('image', image, image.name);
      createProductThirdrow(data)
        .then((data) => {
          event.target.image.value = '';
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
        <Modal.Title>Создать третий ряд ковриков</Modal.Title>
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
          <Col className="mb-3">
            <div>Фотография товара</div>
            <Form.Control
              name="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
              placeholder="Фото товара..."
            />
          </Col>
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

export default CreateProductThirdrow;
