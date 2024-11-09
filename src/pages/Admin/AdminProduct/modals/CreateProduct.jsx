import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { createProduct } from '../../../../http/productApi';
import { getAllBrand } from '../../../../http/brandApi';
import { getAllCarModelByBrandId } from '../../../../http/carModelApi';

const defaultValue = {
  name: '',
  old_price: '',
  new_price: '',
  brand: '',
  carModel: '',
};
const defaultValid = {
  name: null,
  old_price: null,
  new_price: null,
  brand: null,
  carModel: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'old_price') result.old_price = value.old_price.trim() !== '';
    if (key === 'new_price') result.new_price = value.new_price.trim() !== '';
    if (key === 'brand') result.brand = value.brand;
    if (key === 'carModel') result.carModel = value.carModel;
  }
  return result;
};

const CreateProduct = (props) => {
  const { show, setShow, setChange } = props;
  const [brands, setBrands] = React.useState(null);
  const [filteredCarModels, setFilteredCarModels] = React.useState([]);
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [image, setImage] = React.useState(null);
  const [patternImage, setPatternImage] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrand();
        setBrands(brandsData);
      } catch (error) {
        console.error('Ошибка при загрузке брендов:', error);
        alert('Не удалось загрузить бренды. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleBrandChange = (e) => {
    const selectedBrandId = e.target.value;
    setValue({
      ...value,
      brand: selectedBrandId,
      carModel: '', // Reset carModel when brand changes
    });
  };

  React.useEffect(() => {
    const fetchCarModels = async () => {
      if (value.brand) {
        try {
          const carModelsData = await getAllCarModelByBrandId(value.brand);
          setFilteredCarModels(carModelsData);
        } catch (error) {
          console.error('Ошибка при загрузке моделей автомобилей по ID бренда:', error);
          alert('Не удалось загрузить модели автомобилей. Пожалуйста, попробуйте позже.');
        }
      }
    };

    fetchCarModels();
  }, [value.brand]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePatternImageChange = (event) => {
    setPatternImage(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (
      correct.name &&
      correct.old_price &&
      correct.new_price &&
      correct.brand &&
      correct.carModel
    ) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('old_price', value.old_price.trim());
      data.append('new_price', value.new_price.trim());
      data.append('brandId', value.brand);
      data.append('carModelId', value.carModel);
      data.append('image', image, image.name);
      data.append('pattern_image', patternImage, patternImage.name);
      createProduct(data)
        .then((data) => {
          event.target.image.value = '';
          event.target.patternImage.image = '';
          setValue(defaultValue);
          setValid(defaultValid);
          setShow(false);
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Создать карточку товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="brand"
                value={value.brand}
                onChange={(e) => handleBrandChange(e)}
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
          <Row>
            <Col>
              <Form.Select
                name="carModel"
                value={value.carModel}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.carModel === true}
                isInvalid={valid.carModel === false}>
                <option value="">Серия</option>
                {filteredCarModels.map((carModel) => (
                  <option key={carModel.id} value={carModel.id}>
                    {carModel.name}
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
              <Form.Control
                name="old_price"
                value={value.old_price}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.old_price === true}
                isInvalid={valid.old_price === false}
                placeholder="Старая цена"
                className="mb-3"
              />
            </Col>
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
          <Col className="mb-3">
            <div>Фотография товара</div>
            <Form.Control
              name="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
              placeholder="Фото товара..."
            />
          </Col>
          <Col className="mb-3">
            <div>Фотография лекало</div>
            <Form.Control
              name="patternImage"
              type="file"
              onChange={(e) => handlePatternImageChange(e)}
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

export default CreateProduct;
