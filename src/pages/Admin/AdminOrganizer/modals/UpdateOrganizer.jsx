import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneOrganizer, updateOrganizer } from '../../../../http/organizerApi';

const defaultValue = { size: '', new_price: '' };
const defaultValid = {
  size: null,
  new_price: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'size') result.size = value.size.trim() !== '';
    if (key === 'new_price') result.new_price = value.new_price.trim() !== '';
  }
  return result;
};

const UpdateOrganizer = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOneOrganizer(id)
        .then((data) => {
          const prod = {
            size: data.size,
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
    if (correct.size && correct.new_price) {
      const data = new FormData();
      data.append('size', value.size.trim());
      data.append('new_price', value.new_price.trim());
      updateOrganizer(id, data)
        .then((data) => {
          event.target.image.value = '';
          const prod = {
            size: data.size,
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
            name="size"
            value={value.size}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.size === true}
            isInvalid={valid.size === false}
            placeholder="Размер"
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

export default UpdateOrganizer;
