import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createMaterialRug } from '../../../../http/materailRugApi';
import { getAllCellShape } from '../../../../http/cellShapeApi';

const defaultValue = {
  color: '',
  cellshape: '',
  name: '',
};
const defaultValid = {
  color: null,
  cellshape: null,
  name: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'color') result.color = value.color.trim() !== '';
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'cellshape') result.cellshape = value.cellshape;
  }
  return result;
};

const CreateMaterialRug = (props) => {
  const { show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [cellshapes, setCellshapes] = React.useState(null);
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    getAllCellShape().then((data) => setCellshapes(data));
  }, []);

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
    if (correct.color && correct.cellshape && correct.name) {
      const data = new FormData();
      data.append('color', value.color.trim());
      data.append('name', value.name.trim());
      data.append('cellshapeId', value.cellshape);
      data.append('image', image, image.name);

      createMaterialRug(data)
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
        <Modal.Title>Создать цвет материала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mt-3">
            <Col>
              <Form.Select
                name="cellshape"
                value={value.cellshape}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.cellshape === true}
                isInvalid={valid.cellshape === false}>
                <option value="">Форма ячейки</option>
                {cellshapes &&
                  cellshapes.map((cellshape) => (
                    <option key={cellshape.id} value={cellshape.id}>
                      {cellshape.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Control
                name="color"
                value={value.color}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.color === true}
                isInvalid={valid.color === false}
                placeholder="Цвет"
                classcolor="mb-3"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Control
                name="name"
                value={value.name}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.name === true}
                isInvalid={valid.name === false}
                placeholder="Название по-русски"
                classcolor="mb-3"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <Form.Control
                name="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
                placeholder="Изображение..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="mt-3" type="submit">
                Сохранить
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateMaterialRug;
