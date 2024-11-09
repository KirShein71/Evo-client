import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneCarModel, updateCarModel } from '../../../../http/carModelApi';
import { getAllBrand } from '../../../../http/brandApi';

const defaultValue = { name: '', brand: '' };
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

const UpdateCarModel = (props) => {
  const { id, show, setShow, setChange } = props;
  const [brands, setBrands] = React.useState(null);
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    const fetchCarModel = async () => {
      if (id) {
        try {
          const data = await getOneCarModel(id);
          const prod = {
            name: data.name,
          };
          setValue(prod);
          setValid(isValid(prod));
        } catch (error) {
          console.error('Ошибка при загрузке модели автомобиля:', error);
          alert(
            error.response?.data?.message ||
              'Не удалось загрузить модель автомобиля. Пожалуйста, попробуйте позже.',
          );
        }
      }

      try {
        const brandsData = await getAllBrand();
        setBrands(brandsData);
      } catch (error) {
        console.error('Ошибка при загрузке брендов:', error);
        alert('Не удалось загрузить бренды. Пожалуйста, попробуйте позже.');
      }
    };

    fetchCarModel();
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
    if (correct.name && correct.brand) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('brandId', value.brand);
      updateCarModel(id, data)
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
        <Modal.Title>Редактирование серии автомобиля</Modal.Title>
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
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCarModel;
