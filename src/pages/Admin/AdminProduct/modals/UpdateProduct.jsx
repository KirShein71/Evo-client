import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneProduct, updateProduct } from '../../../../http/productApi';
import { getAllBrand } from '../../../../http/brandApi';
import { getAllCarModelByBrandId } from '../../../../http/carModelApi';

const defaultValue = { name: '', old_price: '', new_price: '', brand: '', carmodel: '' };
const defaultValid = {
  name: null,
  old_price: null,
  new_price: null,
  brand: null,
  carmodel: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'old_price') result.old_price = value.old_price.trim() !== '';
    if (key === 'new_price') result.new_price = value.new_price.trim() !== '';
    if (key === 'brand') result.brand = value.brand;
    if (key === 'carmodel') result.carmodel = value.carmodel;
  }
  return result;
};

const UpdateProduct = (props) => {
  const { id, show, setShow, setChange } = props;
  const [brands, setBrands] = React.useState(null);
  const [filteredCarModels, setFilteredCarModels] = React.useState([]);
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [image, setImage] = React.useState(null);
  const [patternImage, setPatternImage] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getOneProduct(id);
          const prod = {
            name: productData.name,
          };
          setValue(prod);
          setValid(isValid(prod));
        } catch (error) {
          console.error('Ошибка при загрузке продукта:', error);
          alert(error.response?.data?.message || 'Не удалось загрузить продукт.');
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

    fetchProduct();
  }, [id]);

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
      carmodel: '', // Reset carModel when brand changes
    });
  };

  React.useEffect(() => {
    const fetchCarModelsByBrand = async () => {
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

    fetchCarModelsByBrand();
  }, [value.brand]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePatternImageChange = (event) => {
    setPatternImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (
      correct.name &&
      correct.old_price &&
      correct.new_price &&
      correct.brand &&
      correct.carmodel
    ) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('old_price', value.old_price.trim());
      data.append('new_price', value.new_price.trim());
      data.append('brandId', value.brand);
      data.append('carmodelId', value.carmodel);
      if (image) data.append('image', image, image.name);
      if (patternImage) data.append('pattern_image', patternImage, patternImage.name);
      updateProduct(id, data)
        .then((data) => {
          event.target.image.value = '';
          event.target.patternImage.value = '';
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
        <Modal.Title>Редактирование карточки товара</Modal.Title>
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
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="carmodel"
                value={value.carmodel}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.carmodel === true}
                isInvalid={valid.carmodel === false}>
                <option value="">Серия</option>
                {filteredCarModels.map((carModel) => (
                  <option key={carModel.id} value={carModel.id}>
                    {carModel.name}
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
              <Form.Control
                name="old_price"
                value={value.old_price}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.old_price === true}
                isInvalid={valid.old_price === false}
                placeholder="Старая цена."
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
              name="image"
              type="file"
              onChange={(e) => handlePatternImageChange(e)}
              placeholder="Фото лекало..."
            />
          </Col>
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

export default UpdateProduct;
