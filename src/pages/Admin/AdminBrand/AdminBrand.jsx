import React from 'react';
import { getAllBrand, deleteBrand } from '../../../http/brandApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateBrand from './modals/createBrand';
import UpdateBrand from './modals/updateBrand';

const AdminBrand = () => {
  const [brands, setBrands] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [createShow, setCreateShow] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [updateShow, setUpdateShow] = React.useState(false);
  const [brandId, setBrandId] = React.useState(null);

  React.useEffect(() => {
    getAllBrand()
      .then((data) => setBrands(data))
      .finally(() => setFetching(false));
  }, [change]);

  const handleUpdateBrand = (id) => {
    setBrandId(id);
    setUpdateShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteBrand(id)
      .then((data) => {
        setChange(!change);
        alert(`Марка машины «${data.name}» удалена`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Марки автомобилей</h1>
      <Button onClick={() => setCreateShow(true)}>Создать бренд автомобиля</Button>
      <CreateBrand show={createShow} setShow={setCreateShow} setChange={setChange} />
      <UpdateBrand show={updateShow} setShow={setUpdateShow} setChange={setChange} id={brandId} />
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Картинка</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {item.image && (
                    <a
                      href={process.env.REACT_APP_IMG_URL + item.image}
                      target="_blank"
                      rel="noreferrer">
                      фото
                    </a>
                  )}
                </td>
                <td>
                  <Button variant="success" size="sm" onClick={() => handleUpdateBrand(item.id)}>
                    Редактировать
                  </Button>
                </td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
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

export default AdminBrand;
