import React from 'react';
import { getAllHome, deleteHome, deleteHomeImage } from '../../../http/homeApi';
import CreateHomeProduct from './modals/CreateHomeProduct';
import CreateHomeImage from './modals/CreateHomeImage';
import UpdateHomeProduct from './modals/UpdateHomeProduct';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateHomePrice from './modals/UpdateHomePrice';

const AdminHome = () => {
  const [homeProducts, setHomeProducts] = React.useState([]);
  const [homeId, setHomeId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [createHomeModal, setCreateHomeModal] = React.useState(false);
  const [createHomeImageModal, setCreateHomeImageModal] = React.useState(false);
  const [updateHomeModal, setUpdateHomeModal] = React.useState(false);
  const [updateHomePriceModal, setUpdateHomePriceModal] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const data = await getAllHome();
        setHomeProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке домашних продуктов:', error);
        alert('Не удалось загрузить домашние продукты. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchHomeProducts();
  }, [change]);

  const handleUpdateHomeProduct = (id) => {
    setHomeId(id);
    setUpdateHomeModal(true);
  };

  const handleUpdateHomePrice = (id) => {
    setHomeId(id);
    setUpdateHomePriceModal(true);
  };

  const handleCreateHomeImage = (id) => {
    setHomeId(id);
    setCreateHomeImageModal(true);
  };

  const handleDeleteHomeProduct = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить карточку?');
    if (confirmed) {
      deleteHome(id)
        .then(() => {
          alert('Карточка товара удалена');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleDeleteHomeImage = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить картинку?');
    if (confirmed) {
      deleteHomeImage(id)
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
      <Button onClick={() => setCreateHomeModal(true)}>Создать карточку товара</Button>
      <CreateHomeProduct
        show={createHomeModal}
        setShow={setCreateHomeModal}
        setChange={setChange}
      />
      <CreateHomeImage
        show={createHomeImageModal}
        setShow={setCreateHomeImageModal}
        setChange={setChange}
        homeId={homeId}
      />
      <UpdateHomeProduct
        show={updateHomeModal}
        setShow={setUpdateHomeModal}
        setChange={setChange}
        id={homeId}
      />
      <UpdateHomePrice
        show={updateHomePriceModal}
        setShow={setUpdateHomePriceModal}
        setChange={setChange}
        id={homeId}
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
            {homeProducts.map((homeProduct) => (
              <tr key={homeProduct.id}>
                <td>{homeProduct.name}</td>
                <td>
                  {homeProduct.home_images.map((img) => (
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
                        onClick={() => handleDeleteHomeImage(img.id)}>
                        удалить
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => handleCreateHomeImage(homeProduct.id)}>
                    Добавить изображения
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleUpdateHomeProduct(homeProduct.id)}
                    variant="success"
                    size="sm">
                    Редактировать
                  </Button>
                </td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUpdateHomePrice(homeProduct.id)}>
                  {homeProduct.new_price}
                </td>
                <td>
                  <Button
                    onClick={() => handleDeleteHomeProduct(homeProduct.id)}
                    variant="danger"
                    size="sm">
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

export default AdminHome;
