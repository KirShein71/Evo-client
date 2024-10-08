import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createBagImage, getAllBagMaterial, getAllBagSize } from '../../../../http/bagApi';

const defaultValue = {
  bagmaterial: '',
  bagsize: '',
};
const defaultValid = {
  bagmaterial: null,
  bagsize: null,
};

const CreateBagImage = (props) => {
  const { show, setShow, setChange, bagId } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [bagmaterials, setBagmaterials] = React.useState([]);
  const [bagsizes, setBagsizes] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [selectedImages, setSelectedImages] = React.useState([]);

  React.useEffect(() => {
    Promise.all([getAllBagMaterial(), getAllBagSize()])
      .then(([bagMaterialsData, bagSizesData]) => {
        setBagmaterials(bagMaterialsData);
        setBagsizes(bagSizesData);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  const handleMaterialChange = (e) => {
    const bagmaterialId = e.target.value;
    setValue((prevValue) => ({
      ...prevValue,
      bagmaterial: bagmaterialId,
    }));
  };

  const handleSizeChange = (e) => {
    const bagsizeId = e.target.value;
    setValue((prevValue) => ({
      ...prevValue,
      bagsize: bagsizeId,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddImage = () => {
    if (value.bagmaterial && value.bagsize && image) {
      const newImage = {
        bagmaterial: value.bagmaterial,
        bagsize: value.bagsize,
        image: image,
      };

      setSelectedImages((prev) => [...prev, newImage]);
      setValue(defaultValue);
      setValid(defaultValid);
    }
  };

  const handleSaveImages = () => {
    const data = selectedImages.map((image) => {
      const formData = new FormData();
      formData.append('bagmaterialId', image.bagmaterial);
      formData.append('bagsizeId', image.bagsize);
      formData.append('bagId', bagId);
      formData.append('image', image.image);
      return formData;
    });

    Promise.all(data.map(createBagImage))
      .then(() => {
        setSelectedImages([]);
        setShow(false);
        setChange((state) => !state);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllImages = () => {
    setSelectedImages([]);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Создать фотографии товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Row className="mt-3 mb-4">
            <Col>
              <Form.Select
                name="material"
                value={value.material}
                onChange={(e) => handleMaterialChange(e)}
                isValid={valid.material === true}
                isInvalid={valid.material === false}>
                <option value="">Цвет товара</option>
                {bagmaterials &&
                  bagmaterials.map((bagmaterial) => (
                    <option key={bagmaterial.id} value={bagmaterial.id}>
                      {bagmaterial.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3 mb-4">
            <Col>
              <Form.Select
                name="bagsize"
                value={value.bagsize}
                onChange={(e) => handleSizeChange(e)}
                isValid={valid.bagsize === true}
                isInvalid={valid.bagsize === false}>
                <option value="">Размер товара</option>
                {bagsizes &&
                  bagsizes.map((bagsize) => (
                    <option key={bagsize.id} value={bagsize.id}>
                      {bagsize.size}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Col className="mb-3">
            <Form.Control
              name="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
              placeholder="Фото товара..."
            />
          </Col>
          <Row>
            <Col>
              <Button className="mb-3" onClick={handleAddImage}>
                Добавить
              </Button>
            </Col>
          </Row>
          {selectedImages.map((image, index) => (
            <div key={index}>
              <Row className="mb-3">
                <Col>
                  <Form.Control disabled value={image.image.name} className="mb-3" />
                </Col>
                <Col>
                  <Form.Control disabled value={image.bagmaterial} className="mb-3" />
                </Col>
                <Col>
                  <Form.Control disabled value={image.bagsize} className="mb-3" />
                </Col>
                <Col>
                  <Button variant="danger" onClick={() => handleRemoveImage(index)}>
                    Удалить
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
          {selectedImages.length > 0 && (
            <>
              <Button className="me-3" onClick={handleSaveImages}>
                Сохранить все изображения
              </Button>
              <Button onClick={handleRemoveAllImages}>Удалить все</Button>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBagImage;
