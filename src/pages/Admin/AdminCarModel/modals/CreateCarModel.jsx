import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createCarModel } from '../../../../http/carModelApi';
import { getAllBrand } from '../../../../http/brandApi';

const defaultValue = {
  name: '',
  brand: '',
};
const defaultValid = {
  name: null,
  brand: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'brand') result.brand = value.brand;
  }
  return result;
};

const CreateCarModel = (props) => {
  const { show, setShow, setChange } = props;
  const [brands, setBrands] = React.useState(null);
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrand();
        setBrands(data);
      } catch (error) {
        console.error('Ошибка при загрузке брендов:', error);
        alert('Не удалось загрузить бренды. Пожалуйста, попробуйте позже.');
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.name && correct.brand) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('brandId', value.brand);

      createCarModel(data)
        .then((data) => {
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
        <Modal.Title>Создать серию автомобиля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Select
                name="brand"
                value={value.brand}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.brand === true}
                isInvalid={valid.brand === false}>
                <option value="">Бренд</option>
                {brands &&
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
              </Form.Select>
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
                placeholder="Название"
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

export default CreateCarModel;
