import React from 'react';
import { getAllBag, deleteBag, deleteBagImage, deleteBagPicture } from '../../../http/bagApi';
import CreateBag from './modals/CreateBag';
import CreateBagImage from './modals/CreateBagImage';
import CreateBagPicture from './modals/CreateBagPicture';
import UpdateBag from './modals/UpdateBag';
import UpdateBagPrice from './modals/UpdateBagPrice';
import { Button, Container, Spinner, Table } from 'react-bootstrap';

const AdminBag = () => {
  const [bags, setBags] = React.useState([]);
  const [bagId, setBagId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [createBagModal, setCreateBagModal] = React.useState(false);
  const [createBagImageModal, setCreateBagImageModal] = React.useState(false);
  const [createBagPictureModal, setCreateBagPictureModal] = React.useState(false);
  const [updateBagModal, setUpdateBagModal] = React.useState(false);
  const [updateBagPriceModal, setUpdateBagPriceModal] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await getAllBag();
        setBags(data);
      } catch (error) {
        console.error('Ошибка при загрузке сумок:', error);
        alert('Не удалось загрузить сумки. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchBags();
  }, [change]);

  const handleUpdateBag = (id) => {
    setBagId(id);
    setUpdateBagModal(true);
  };

  const handleUpdateBagPrice = (id) => {
    setBagId(id);
    setUpdateBagPriceModal(true);
  };

  const handleCreateBagImage = (id) => {
    setBagId(id);
    setCreateBagImageModal(true);
  };

  const handleCreateBagPicture = (id) => {
    setBagId(id);
    setCreateBagPictureModal(true);
  };

  const handleDeleteBag = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить карточку?');
    if (confirmed) {
      deleteBag(id)
        .then(() => {
          alert('Карточка товара удалена');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleDeleteBagImage = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить картинку?');
    if (confirmed) {
      deleteBagImage(id)
        .then(() => {
          alert('Картинка товара удалена');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleDeleteBagPicture = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить картинку?');
    if (confirmed) {
      deleteBagPicture(id)
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
      <Button onClick={() => setCreateBagModal(true)}>Создать карточку товара</Button>
      <CreateBag show={createBagModal} setShow={setCreateBagModal} setChange={setChange} />
      <CreateBagImage
        show={createBagImageModal}
        setShow={setCreateBagImageModal}
        setChange={setChange}
        bagId={bagId}
      />
      <CreateBagPicture
        show={createBagPictureModal}
        setShow={setCreateBagPictureModal}
        setChange={setChange}
        bagId={bagId}
      />
      <UpdateBag
        show={updateBagModal}
        setShow={setUpdateBagModal}
        setChange={setChange}
        id={bagId}
      />
      <UpdateBagPrice
        show={updateBagPriceModal}
        setShow={setUpdateBagPriceModal}
        setChange={setChange}
        id={bagId}
      />
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Картинка основаная</th>
              <th>Картинки внизу</th>
              <th>Редактировать</th>
              <th>Стоимость</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {bags.map((bag) => (
              <tr key={bag.id}>
                <td>{bag.name}</td>
                <td>
                  {bag.bag_images.map((img) => (
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                      <div style={{ marginRight: '15px' }}>
                        {img.bagmaterialId === 1
                          ? 'Черный'
                          : img.bagmaterialId === 2
                          ? 'Белый'
                          : img.bagmaterialId === 3
                          ? 'Красный'
                          : img.bagmaterialId === 4
                          ? 'Синий'
                          : ''}
                      </div>
                      <div>
                        {img.bagsizeId === 1 ? '40 см' : img.bagsizeId === 2 ? '50 см' : ''}
                      </div>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteBagImage(img.id)}>
                        удалить
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" className="mt-3" onClick={() => handleCreateBagImage(bag.id)}>
                    Добавить изображения
                  </Button>
                </td>
                <td>
                  {bag.bag_pictures.map((picture) => (
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                      <div style={{ marginRight: '15px' }}>
                        {picture.bagmaterialId === 1
                          ? 'Черный'
                          : picture.bagmaterialId === 2
                          ? 'Белый'
                          : picture.bagmaterialId === 3
                          ? 'Красный'
                          : picture.bagmaterialId === 4
                          ? 'Синий'
                          : ''}
                      </div>
                      <div>
                        {picture.bagsizeId === 1 ? '40 см' : picture.bagsizeId === 2 ? '50 см' : ''}
                      </div>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteBagPicture(picture.id)}>
                        удалить
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" className="mt-3" onClick={() => handleCreateBagPicture(bag.id)}>
                    Добавить изображения
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleUpdateBag(bag.id)} variant="success" size="sm">
                    Редактировать
                  </Button>
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleUpdateBagPrice(bag.id)}>
                  {bag.new_price}
                </td>
                <td>
                  <Button onClick={() => handleDeleteBag(bag.id)} variant="danger" size="sm">
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

export default AdminBag;
