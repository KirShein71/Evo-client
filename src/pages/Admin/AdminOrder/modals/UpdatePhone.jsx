import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updatePhone, getOne } from '../../../../http/orderApi';

const defaultValue = { phone: '' };
const defaultValid = {
  phone: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'phone') result.phone = value.phone;
  }
  return result;
};

const UpdatePhone = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOne(id)
        .then((data) => {
          const prod = {
            phone: data.phone.toString(),
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
    if (correct.phone) {
      const data = new FormData();
      data.append('phone', value.phone.trim());
      updatePhone(id, data)
        .then((data) => {
          const prod = {
            phone: data.phone.toString(),
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
        <Modal.Title>Изменить номер клиента</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="phone"
                value={value.phone}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.phone === true}
                isInvalid={valid.phone === false}
                placeholder="Вводить с 8"
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

export default UpdatePhone;
