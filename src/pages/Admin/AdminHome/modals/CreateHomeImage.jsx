import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createHomeImage } from '../../../../http/homeApi';
import { getAllMaterialRug } from '../../../../http/materailRugApi';

const defaultValue = {
  material: '',
};
const defaultValid = {
  material: null,
};

const CreateHomeImage = (props) => {
  const { show, setShow, setChange, homeId } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);
  const [materials, setMaterials] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [selectedImages, setSelectedImages] = React.useState([]);

  React.useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await getAllMaterialRug();
        setMaterials(data);
      } catch (error) {
        console.error('Ошибка при загрузке материалов:', error);
        alert('Не удалось загрузить материалы. Пожалуйста, попробуйте позже.');
      }
    };

    fetchMaterials();
  }, []);

  const handleMaterialChange = (e) => {
    const materialId = e.target.value;
    setValue((prevValue) => ({
      ...prevValue,
      material: materialId,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddImage = () => {
    if (value.material && image) {
      const newImage = {
        material: value.material,
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
      formData.append('materialId', image.material);
      formData.append('homeId', homeId);
      formData.append('image', image.image);
      return formData;
    });

    Promise.all(data.map(createHomeImage))
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
        <Modal.Title>Создать фотографии ковриков</Modal.Title>
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
                <option value="">Цвет коврика</option>
                {materials &&
                  materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
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
                  <Form.Control disabled value={image.material} className="mb-3" />
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

export default CreateHomeImage;
