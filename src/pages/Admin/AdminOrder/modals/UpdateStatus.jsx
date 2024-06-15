import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateStatus, getOne } from '../../../../http/orderApi';

const defaultValue = { status: '' };
const defaultValid = {
  status: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'status') result.status = value.status;
  }
  return result;
};

const UpdateStatus = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const status = [{ name: 'Новый' }, { name: 'В работе' }, { name: 'Закрыт' }];

  React.useEffect(() => {
    if (id) {
      getOne(id)
        .then((data) => {
          const prod = {
            status: data.status.toString(),
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
    if (correct.status) {
      const data = new FormData();
      data.append('status', value.status.trim());
      updateStatus(id, data)
        .then((data) => {
          const prod = {
            status: data.status.toString(),
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
        <Modal.Title>Изменить статус заказа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="status"
                value={value.status}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.status === true}
                isInvalid={valid.status === false}>
                <option value="">Статус</option>
                {status && status.map((status) => <option key={status.id}>{status.name}</option>)}
              </Form.Select>
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

export default UpdateStatus;
