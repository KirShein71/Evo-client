import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneBrand, updateBrand } from '../../../../http/brandApi';

const defaultValue = { name: '' };
const defaultValid = {
  name: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
  }
  return result;
};

const UpdateBrand = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      getOneBrand(id)
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.name) {
      const data = new FormData();
      data.append('name', value.name.trim());
      if (image) data.append('image', image, image.name);
      updateBrand(id, data)
        .then((data) => {
          event.target.image.value = '';
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
        <Modal.Title>Редактирование бренда</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Название товара..."
            className="mb-3"
          />
          <Col>
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

export default UpdateBrand;
