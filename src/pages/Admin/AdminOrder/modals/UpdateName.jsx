import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateName, getOne } from '../../../../http/orderApi';

const defaultValue = { name: '', surname: '' };
const defaultValid = {
  name: null,
  surname: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'phone') result.phone = value.phone;
    if (key === 'name') result.name = value.name;
    if (key === 'surname') result.surname = value.surname;
  }
  return result;
};

const UpdateName = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOne(id)
        .then((data) => {
          const prod = {
            name: data.name.toString(),
            surname: data.surname.toString(),
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
    if (correct.name && correct.surname) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('surname', value.surname.trim());
      updateName(id, data)
        .then((data) => {
          const prod = {
            name: data.name.toString(),
            surname: data.surname.toString(),
          };
          setValue(prod);
          setValid(isValid(prod));
          setChange((state) => !state);
          setShow(false);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            console.log('An error occurred');
          }
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="md"
      className="modal__shippingdate">
      <Modal.Header closeButton>
        <Modal.Title>Изменить имя и фамилию клиента</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="name"
                value={value.name}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.name === true}
                isInvalid={valid.name === false}
                placeholder="Имя клиента"
                className="mb-3"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="surname"
                value={value.surname}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.surname === true}
                isInvalid={valid.surname === false}
                placeholder="Фамилия клиента"
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

export default UpdateName;
