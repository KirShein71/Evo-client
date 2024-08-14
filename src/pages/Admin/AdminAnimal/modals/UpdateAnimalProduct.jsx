import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneAnimal, updateAnimal } from '../../../../http/animalApi';

const defaultValue = { name: '', new_price: '' };
const defaultValid = {
  name: null,
  new_price: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'new_price') result.new_price = value.new_price.trim() !== '';
  }
  return result;
};

const UpdateAnimalProduct = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOneAnimal(id)
        .then((data) => {
          const prod = {
            name: data.name,
          };
          setValue(prod);
          setValid(isValid(prod));
        })
        .catch((error) => console.log(error.response.data.message));
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
    if (correct.name && correct.new_price) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('new_price', value.new_price.trim());

      updateAnimal(id, data)
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
        <Modal.Title>Редактирование карточки товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Название"
            className="mb-3"
          />
          <Row>
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

export default UpdateAnimalProduct;
