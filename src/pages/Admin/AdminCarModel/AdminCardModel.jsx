import React from 'react';
import { getAllCarModel, deleteCarModel } from '../../../http/carModelApi';
import { getAllBrand } from '../../../http/brandApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateCarModel from './modals/CreateCarModel';
import UpdateCarModel from './modals/UpdateCarModel';

const AdminCarModel = () => {
  const [carModels, setCarModels] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [createShow, setCreateShow] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [updateShow, setUpdateShow] = React.useState(false);
  const [carModelId, setCarModelId] = React.useState(null);
  const [brands, setBrands] = React.useState([]);
  const [selectedBrand, setSelectedBrand] = React.useState(11);
  const [openBrandModal, setOpenBrandModal] = React.useState(false);

  React.useEffect(() => {
    const fetchCarModelsAndBrands = async () => {
      try {
        const carModelsData = await getAllCarModel();
        setCarModels(carModelsData);

        const brandsData = await getAllBrand();
        setBrands(brandsData);
      } catch (error) {
        console.error('Ошибка при загрузке моделей автомобилей или брендов:', error);
        alert('Не удалось загрузить модели автомобилей или бренды. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchCarModelsAndBrands();
  }, [change]);

  const handleUpdateCarModel = (id) => {
    setCarModelId(id);
    setUpdateShow(true);
  };

  const hadleOpenBrandModal = () => {
    setOpenBrandModal(!openBrandModal);
  };

  const handleDeleteClick = (id) => {
    deleteCarModel(id)
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
      <h1>Серии автомобилей</h1>
      <Button onClick={() => setCreateShow(true)}>Создать серию автомобилей</Button>
      <CreateCarModel show={createShow} setShow={setCreateShow} setChange={setChange} />
      <UpdateCarModel
        show={updateShow}
        setShow={setUpdateShow}
        setChange={setChange}
        id={carModelId}
      />
      <div className="brand">
        <div className="brand__title" onClick={hadleOpenBrandModal}>
          Марка:{' '}
          <span>
            {selectedBrand
              ? selectedBrand && brands.find((brand) => brand.id === selectedBrand)?.name
              : ''}
          </span>
        </div>
        {openBrandModal && (
          <div className="brand__modal">
            <div className="brand__modal-content">
              <div
                className="brand__modal-item"
                onClick={() => {
                  setSelectedBrand(null);
                  setOpenBrandModal(false);
                }}></div>
              {brands.map((brandName) => (
                <div key={brandName.id}>
                  <div
                    className="brand__modal-item"
                    onClick={() => {
                      setSelectedBrand(brandName.id);
                      setOpenBrandModal(false);
                    }}>
                    {brandName.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {carModels
              ?.filter((carmodel) => selectedBrand === null || carmodel.brandId === selectedBrand)
              .map((carmodel) => (
                <tr key={carmodel.id}>
                  <td>{carmodel.name}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateCarModel(carmodel.id)}>
                      Редактировать
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(carmodel.id)}>
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

export default AdminCarModel;
