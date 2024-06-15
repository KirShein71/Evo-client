import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneAnimal, updatePrice } from '../../../../http/animalApi';

const defaultValue = { new_price: '' };
const defaultValid = {
  new_price: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'new_price') result.new_price = value.new_price.trim() !== '';
  }
  return result;
};

const UpdateAnimalPrice = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOneAnimal(id)
        .then((response) => {
          // Проверяем, что response не undefined и у него есть data
          if (response && response.data) {
            const prod = {
              new_price: response.data.new_price, // Доступ к new_price через response.data
            };
            setValue(prod);
            setValid(isValid(prod));
          } else {
            console.error('API не вернул данные.');
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            alert('Произошла ошибка при получении данных.');
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
    if (correct.new_price) {
      const data = new FormData();
      data.append('new_price', value.new_price.trim());

      try {
        const response = await updatePrice(id, data);
        if (response && response.data) {
          const prod = {
            new_price: response.data.new_price,
          };
          setValue(prod);
          setValid(isValid(prod));
          setShow(false);
          setChange((state) => !state);
        } else {
          console.error('API не вернул данные.');
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert('Произошла ошибка при получении данных.');
        }
      }
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Редактирование стоимости товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
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

export default UpdateAnimalPrice;
