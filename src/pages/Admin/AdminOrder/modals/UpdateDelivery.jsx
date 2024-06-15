import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOne, updateDelivery } from '../../../../http/orderApi';

const defaultValue = {
  city: '',
  region: '',
  delivery: '',
};
const defaultValid = {
  city: null,
  region: null,
  delivery: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'city') result.city = value.city;
    if (key === 'region') result.region = value.region;
    if (key === 'delivery') result.delivery = value.delivery;
    return result;
  }
};

const UpdateDelivery = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const delivery = [
    {
      id: 1,
      title: 'Самомвывоз',
    },
    {
      id: 2,
      title: 'ТК СДЭК',
    },
    {
      id: 3,
      title: 'Почта России',
    },
  ];

  React.useEffect(() => {
    if (id) {
      getOne(id)
        .then((data) => {
          const prod = {
            city: data.city,
            region: data.region,
            delivery: data.delivery,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    const data = new FormData();
    data.append('city', value.city);
    data.append('region', value.region);
    data.append('delivery', value.delivery);

    updateDelivery(id, data)
      .then((data) => {
        const prod = {
          city: data.city,
          region: data.region,
          delivery: data.delivery,
        };
        setValue(prod);
        setValid(isValid(prod));
        setShow(false);
        setChange((state) => !state);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Редактирование доставки</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="delivery"
                value={value.delivery}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.delivery === true}
                isInvalid={valid.delivery === false}>
                <option value="">Способ доставки</option>
                {delivery &&
                  delivery.map((delivery) => (
                    <option key={delivery.id} value={delivery.id}>
                      {delivery.title}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="region"
                value={value.region}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.region === true}
                isInvalid={valid.region === false}
                placeholder="Введите регион"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="city"
                value={value.city}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.city === true}
                isInvalid={valid.city === false}
                placeholder="Введите город"
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

export default UpdateDelivery;
