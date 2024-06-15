import React from 'react';
import { getAllHome, deleteHome } from '../../../http/homeApi';
import CreateHomeProduct from './modals/CreateHomeProduct';
import UpdateHomeProduct from './modals/UpdateHomeProduct';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateHomePrice from './modals/UpdateHomePrice';

const AdminHome = () => {
  const [homeProducts, setHomeProducts] = React.useState([]);
  const [homeProductId, setHomeProductId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [createHomeModal, setCreateHomeModal] = React.useState(false);
  const [updateHomeModal, setUpdateHomeModal] = React.useState(false);
  const [updateHomePriceModal, setUpdateHomePriceModal] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    getAllHome()
      .then((data) => setHomeProducts(data))
      .finally(() => setFetching(false));
  }, [change]);

  const handleUpdateHomeProduct = (id) => {
    setHomeProductId(id);
    setUpdateHomeModal(true);
  };

  const handleUpdateHomePrice = (id) => {
    setHomeProductId(id);
    setUpdateHomePriceModal(true);
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
      <UpdateHomeProduct
        show={updateHomeModal}
        setShow={setUpdateHomeModal}
        setChange={setChange}
        id={homeProductId}
      />
      <UpdateHomePrice
        show={updateHomePriceModal}
        setShow={setUpdateHomePriceModal}
        setChange={setChange}
        id={homeProductId}
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
                  {homeProduct.image && (
                    <a
                      href={process.env.REACT_APP_IMG_URL + homeProduct.image}
                      target="_blank"
                      rel="noreferrer">
                      фото
                    </a>
                  )}
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
