import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneProductTrunk, updateProductTrunk } from '../../../../http/trunkApi';

const defaultValue = { old_price: '', new_price: '', name: '' };
const defaultValid = {
  old_price: null,
  new_price: null,
  name: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'old_price') result.old_price = value.old_price;
    if (key === 'new_price') result.new_price = value.new_price;
    if (key === 'name') result.name = value.name;
  }
  return result;
};

const UpdateProductTrunk = (props) => {
  const { trunkId, productId, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    if (trunkId) {
      getOneProductTrunk(trunkId)
        .then((data) => {
          const prod = {
            new_price: data.new_price,
            old_price: data.old_price,
          };
          setValue(prod);
          setValid(isValid(prod));
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            console.log('An error occurred');
          }
        });
    }
  }, [trunkId]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.old_price && correct.new_price) {
      const data = new FormData();
      data.append('old_price', value.old_price);
      data.append('new_price', value.new_price);
      data.append('name', value.name);
      data.append('productId', productId);
      if (image) data.append('image', image, image.name);
      updateProductTrunk(trunkId, data)
        .then((data) => {
          event.target.image.value = '';
          const prod = {
            old_price: data.old_price,
            new_price: data.new_price,
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
        <Modal.Title>Редактирование коврика в багажник</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mt-3">
            <Col>
              <Form.Control
                name="name"
                value={value.name}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.name === true}
                isInvalid={valid.name === false}
                placeholder="Название коврика"
                className="mb-3"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Control
                name="old_price"
                value={value.old_price}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.old_price === true}
                isInvalid={valid.old_price === false}
                placeholder="Старая цена."
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

export default UpdateProductTrunk;
