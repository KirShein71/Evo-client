import React from 'react';
import { getAllAnimal, deleteAnimal, deleteAnimalImage } from '../../../http/animalApi';
import CreateAnimal from './modals/CreateAnimal';
import UpdateAnimalProudct from './modals/UpdateAnimalProduct';
import UpdateAnimalPrice from './modals/UpdateAnimalPrice';
import CreateAnimalImage from './modals/CreateAnimalImage';
import { Button, Container, Spinner, Table } from 'react-bootstrap';

const AdminAnimal = () => {
  const [animals, setAnimals] = React.useState([]);
  const [animalId, setAnimalId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [createAnimalModal, setCreateAnimalModal] = React.useState(false);
  const [updateAnimalProductModal, setUpdateAnimalProudctModal] = React.useState(false);
  const [updateAnimalPriceModal, setUpdateAnimalPriceModal] = React.useState(false);
  const [createAnimalImageModal, setCreateAnimalImageModal] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    getAllAnimal()
      .then((data) => setAnimals(data))
      .finally(() => setFetching(false));
  }, [change]);

  const handleUpdateAnimalProduct = (id) => {
    setAnimalId(id);
    setUpdateAnimalProudctModal(true);
  };

  const handeUpdateAnimalPrice = (id) => {
    setAnimalId(id);
    setUpdateAnimalPriceModal(true);
  };

  const handleCreateAnimalImage = (id) => {
    setAnimalId(id);
    setCreateAnimalImageModal(true);
  };

  const handleDeleteAnimalProduct = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить карточку?');
    if (confirmed) {
      deleteAnimal(id)
        .then(() => {
          alert('Карточка товара удалена');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleDeleteAnimalImage = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить картинку?');
    if (confirmed) {
      deleteAnimalImage(id)
        .then(() => {
          alert('Картинка товара удалена');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Товары</h1>
      <Button onClick={() => setCreateAnimalModal(true)}>Создать карточку товара</Button>
      <CreateAnimal show={createAnimalModal} setShow={setCreateAnimalModal} setChange={setChange} />
      <CreateAnimalImage
        show={createAnimalImageModal}
        setShow={setCreateAnimalImageModal}
        setChange={setChange}
        animalId={animalId}
      />
      <UpdateAnimalProudct
        show={updateAnimalProductModal}
        setShow={setUpdateAnimalProudctModal}
        setChange={setChange}
        id={animalId}
      />
      <UpdateAnimalPrice
        show={updateAnimalPriceModal}
        setShow={setUpdateAnimalPriceModal}
        setChange={setChange}
        id={animalId}
      />
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Картинка</th>
              <th>Редактировать</th>
              <th>Стоимость</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>
                  {animal.animal_images.map((img) => (
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                      <div style={{ marginRight: '15px' }}>
                        {img.materialId === 28
                          ? 'Черный'
                          : img.materialId === 29
                          ? 'Серый'
                          : img.materialId === 30
                          ? 'Коричневый'
                          : img.materialId === 31
                          ? 'Бежевый'
                          : ''}
                      </div>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteAnimalImage(img.id)}>
                        удалить
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => handleCreateAnimalImage(animal.id)}>
                    Добавить изображения
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleUpdateAnimalProduct(animal.id)}
                    variant="success"
                    size="sm">
                    Редактировать
                  </Button>
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => handeUpdateAnimalPrice(animal.id)}>
                  {animal.new_price}
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteAnimalProduct(animal.id)}>
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminAnimal;
