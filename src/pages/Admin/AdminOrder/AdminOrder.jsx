import React from 'react';
import { getAllOrders, deleteOrder, deleteOrderItem } from '../../../http/orderApi';
import { createOrderCdek, createOrderCdekDelivery } from '../../../http/cdekApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateStatus from './modals/UpdateStatus';
import UpdateOrder from './modals/updateOrder';
import UpdatePhone from './modals/UpdatePhone';
import UpdateDelivery from './modals/UpdateDelivery';
import CreateOrder from './modals/CreateOrder';
import CreateNote from './modals/createNote';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

import './style.scss';

const AdminOrder = () => {
  const [orders, setOrders] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [orderId, setOrderId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const status = [
    { name: 'Новый' },
    { name: 'В работе' },
    { name: 'Закрыт' },
    { name: 'Выкуплен' },
    { name: 'Не выкуплен' },
  ];
  const [selectedStatus, setSelectedStatus] = React.useState('Новый');
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const [orderItem, setOrderItem] = React.useState(null);
  const [updateOrderModal, setUpdateOrderModal] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
  const [openModalPhone, setOpenModalPhone] = React.useState(false);
  const [openModalDelivery, setOpenModalDelivery] = React.useState(false);
  const [openCreateOrder, setOpenCreateOrder] = React.useState(false);
  const [isButtonPvzDisabled, setIsButtonPvzDisabled] = React.useState(false);
  const [textButton, setTextButton] = React.useState('Зарегистрировать заказ');
  const [modalCreateNote, setModalCreateNote] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [disabledOrderIds, setDisabledOrderIds] = React.useState([]);

  const modalRef = React.useRef();

  React.useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
        filterOrdersByStatus(selectedStatus, data);

        // Получаем отключенные заказы из localStorage
        const disabledOrders = data.filter((order) => {
          const storedState = localStorage.getItem(`order-${order.id}`);
          return storedState === 'disabled';
        });

        // Обновляем состояние с отключенными id
        setDisabledOrderIds(disabledOrders.map((order) => order.id));
      })
      .finally(() => setFetching(false));
  }, [change, selectedStatus]);

  const filterOrdersByStatus = (status, ordersData) => {
    if (status === 'Все') {
      setFilteredOrders(ordersData);
    } else {
      const filtered = ordersData?.filter((order) => order.order.status === status);
      setFilteredOrders(filtered);
    }
  };

  React.useEffect(() => {
    const hadleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutside);

    return () => {
      document.body.removeEventListener('click', hadleClickOutside);
    };
  });

  const hadleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleUpdateStatus = (id) => {
    setOrderId(id);
    setShow(true);
  };

  const handleOpenModalCreateNote = (id) => {
    setOrderId(id);
    setModalCreateNote(true);
  };

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpdateOrder = (id, productId) => {
    setOrderItem(id);
    setProductId(productId);
    setUpdateOrderModal(true);
  };

  const handleUpdatePhone = (id) => {
    setOrderId(id);
    setOpenModalPhone(true);
  };

  const handleUpdateDelivery = (id) => {
    setOrderId(id);
    setOpenModalDelivery(true);
  };

  const handleDeleteOrder = (id) => {
    console.log(id);
    const confirmed = window.confirm('Вы уверены, что хотите удалить заказ?');
    if (confirmed) {
      deleteOrder(id)
        .then((data) => {
          setChange(!change);
          alert(`Заказ был удален`);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleDeleteOrderItem = (id) => {
    console.log(id);
    const confirmed = window.confirm('Вы уверены, что хотите удалить часть заказа?');
    if (confirmed) {
      deleteOrderItem(id)
        .then((data) => {
          setChange(!change);
          alert(`Часть заказа была удалена`);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleOrderRegistration = async (
    id,
    name,
    surname,
    phone,
    codepvz,
    totalamount,
    citycode,
    tariffcode,
  ) => {
    try {
      const response = await createOrderCdek(
        id,
        name,
        surname,
        phone,
        codepvz,
        totalamount,
        citycode,
        tariffcode,
      );
      if (response && response.requests[0].state === 'ACCEPTED') {
        alert('Заказ успешно зарегистрован в Сдэк');
        setIsButtonPvzDisabled(true);
        setTextButton('Заказ зарегистрирован');
        localStorage.setItem(`order-${id}`, 'disabled');
      } else {
        console.error('Ошибка регистрации заказа:', response);
      }
    } catch (error) {
      console.error('Ошибка регистрации заказа:', error);
    }
  };

  const handleOrderDeliveryRegistration = async (
    id,
    name,
    surname,
    phone,
    totalamount,
    citycode,
    street,
    home,
    flat,
    tariffcode,
  ) => {
    try {
      const response = await createOrderCdekDelivery(
        id,
        name,
        surname,
        phone,
        totalamount,
        citycode,
        street,
        home,
        flat,
        tariffcode,
      );
      if (response && response.requests[0].state === 'ACCEPTED') {
        alert('Заказ успешно зарегистрован в Сдэк');
        setIsButtonPvzDisabled(true);
        setTextButton('Заказ зарегистрирован');
        localStorage.setItem(`order-${id}`, 'disabled');
      } else {
        console.error('Ошибка регистрации заказа:', response);
      }
    } catch (error) {
      console.error('Ошибка регистрации заказа:', error);
    }
  };

  const headers = [
    { label: 'Номер заказа', key: 'id' },
    { label: 'Название', key: 'name' },
    { label: 'Материал', key: 'material' },
    { label: 'Кант', key: 'edging' },
    { label: 'Количество', key: 'quantity' },
  ];

  const flattenedOrders = orders.map((item) => ({
    id: item.id,
    name: item.product?.name || item.animal?.name || item.home?.name || item.bag?.name,
    material: item.material?.name,
    bagmaterial: item.bagmaterial?.name,
    bagsize: item.bagsize?.size,
    edging: item.edging && item.edging.name ? item.edging.name : '',
    quantity: item.quantity,
  }));

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Все заказы</h1>
      <UpdateStatus id={orderId} show={show} setShow={setShow} setChange={setChange} />
      <UpdatePhone
        id={orderId}
        show={openModalPhone}
        setShow={setOpenModalPhone}
        setChange={setChange}
      />
      <UpdateDelivery
        id={orderId}
        show={openModalDelivery}
        setShow={setOpenModalDelivery}
        setChange={setChange}
      />
      <UpdateOrder
        id={orderItem}
        productId={productId}
        show={updateOrderModal}
        setShow={setUpdateOrderModal}
        setChange={setChange}
      />
      <CreateNote
        id={orderId}
        show={modalCreateNote}
        setShow={setModalCreateNote}
        setChange={setChange}
      />
      <CreateOrder show={openCreateOrder} setShow={setOpenCreateOrder} setChange={setChange} />
      <Button variant="primary" onClick={() => setOpenCreateOrder(true)}>
        Создать заказ
      </Button>
      <div className="dropdown" ref={modalRef}>
        <div className="dropdown__title" onClick={hadleOpenModal}>
          Статус: <span>{selectedStatus ? selectedStatus : 'Новый'}</span>
        </div>
        {openModal && (
          <div className="dropdown__modal">
            <div className="dropdown__modal-content">
              <ul className="dropdown__modal-items">
                <div
                  className="dropdown__modal-item"
                  onClick={() => {
                    setSelectedStatus(null);
                    setOpenModal(false);
                  }}></div>
                {status.map((statusName) => (
                  <div key={statusName.id}>
                    <li
                      className="dropdown__modal-item"
                      onClick={() => {
                        setSelectedStatus(statusName.name);
                        setOpenModal(false);
                        filterOrdersByStatus(statusName.name, orders);
                      }}>
                      {statusName.name}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Table bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Покупатель</th>
            <th>Доставка</th>
            <th>Комментарии</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((item) => (
            <tr key={item.id}>
              <td>{item.orderId}</td>
              <Link
                to={
                  item.product && item.product.name
                    ? `/productproperty/${item.product.name
                        .replace(/-+/g, '--')
                        .replace(/s+/g, '-')}`
                    : item.home && item.home.name
                    ? '/homeproduct'
                    : item.bag && item.bag.name
                    ? `/organizer/${item.bag.name.replace(/-+/g, '--').replace(/s+/g, '-')}`
                    : ''
                }>
                <td>
                  {item.product && item.product.name
                    ? item.product.name
                    : item.trunk && item.trunk.product && item.trunk.product.name
                    ? item.trunk.product.name
                    : item.home && item.home.name
                    ? item.home.name
                    : item.animal && item.animal.name
                    ? item.animal.name
                    : item.bag && item.bag.name
                    ? item.bag.name
                    : ''}
                </td>
              </Link>
              <td
                style={{ cursor: 'pointer' }}
                onClick={() => handleUpdateOrder(item.id, item.productId)}>
                <ul>
                  <li>
                    Материал: {item.material?.name} || {item.bagmaterial?.name}
                  </li>
                  {item.bag !== null ? <li>Размер: {item.bagsize?.size}</li> : ''}
                  <li>{item.edging ? <span>Кант: {item.edging.name}</span> : null}</li>
                  {item.bag === null ? (
                    <li>
                      Количество: {item.quantity} шт {item.thirdrow ? '3 ряда' : ''}
                    </li>
                  ) : (
                    ''
                  )}
                  <li>{item.trunk ? <span>Багажник: {item.quantity_trunk} шт</span> : null}</li>
                  <li>
                    {item.steel ? <span>{item.steel.name}</span> : null}{' '}
                    {item.saddle ? <span>{item.saddle.name}</span> : null}
                  </li>
                  <li>
                    Полная стоимость заказа (без доставки): {item.order.totalamount}, Стоимость
                    доставки: {Number(item.order.deliverysum) + 100};
                  </li>
                </ul>
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</td>
              <td
                style={{
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor:
                    item.order.status === 'Новый'
                      ? 'red'
                      : item.order.status === 'В работе'
                      ? 'green'
                      : 'black',
                }}
                onClick={() => handleUpdateStatus(item.order.id)}>
                {item.order.status}
              </td>
              <td>
                {item.order.name} {item.order.surname}
                <div style={{ cursor: 'pointer' }} onClick={() => handleUpdatePhone(item.order.id)}>
                  {item.order.phone}
                </div>
              </td>
              {item.order.delivery === 2 ? (
                <td>
                  {item.order.codepvz !== null ? (
                    <>
                      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
                        СДЭК
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        Доставка в пункт выдачи сдэк
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        {' '}
                        Населенный пунк: {item.order.location}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        Код пвз: {item.order.codepvz}
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <Button
                          className="mt-3 mb-3"
                          variant="primary"
                          disabled={disabledOrderIds.includes(item.id)}
                          onClick={() =>
                            handleOrderRegistration(
                              item.id,
                              item.order.name,
                              item.order.surname,
                              item.order.phone,
                              item.order.codepvz,
                              item.order.totalamount,
                              item.order.citycode,
                              item.order.tariffcode,
                            )
                          }>
                          {disabledOrderIds.includes(item.id)
                            ? 'Заказ зарегистрирован'
                            : 'Зарегистрировать заказ'}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
                        СДЭК
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        Доставка сдэк курьером до адреса
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        {' '}
                        {item.order.location}, улица: {item.order.street}, дом: {item.order.home},
                        кв: {item.order.flat}
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-3 mb-3"
                          disabled={disabledOrderIds.includes(item.id)}
                          onClick={() =>
                            handleOrderDeliveryRegistration(
                              item.id,
                              item.order.name,
                              item.order.surname,
                              item.order.phone,
                              item.order.totalamount,
                              item.order.citycode,
                              item.order.street,
                              item.order.home,
                              item.order.flat,
                              item.order.tariffcode,
                            )
                          }>
                          {disabledOrderIds.includes(item.id)
                            ? 'Заказ зарегистрирован'
                            : 'Зарегистрировать заказ'}
                        </Button>
                      </div>
                    </>
                  )}
                </td>
              ) : (
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUpdateDelivery(item.order.id)}>
                  <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
                    {item.order.delivery === 1
                      ? 'Самовывоз'
                      : item.order.delivery === 3
                      ? 'Почта России'
                      : ''}
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: '400' }}>
                    Индекс пвз: {item.order.city}
                    <div style={{ fontSize: '17px', fontWeight: '400' }}>
                      Адрес пвз: {item.order.region}
                    </div>
                  </div>
                </td>
              )}
              <td>
                <div className="note">
                  <div className="note__content">
                    <p
                      className="note__field"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleOpenModalCreateNote(item.order.id)}>
                      {isExpanded
                        ? item.order.note
                        : item.order.note && item.order.note.slice(0, 250)}
                    </p>
                    {item.order.note && item.order.note.length > 250 && (
                      <div className="note__show" onClick={handleToggleText}>
                        {isExpanded ? 'Скрыть' : 'Показать все...'}
                      </div>
                    )}
                  </div>
                  {item.order.note === null ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button size="sm" onClick={() => handleOpenModalCreateNote(item.order.id)}>
                        Добавить
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </td>
              <td>
                <Button
                  onClick={() => {
                    const hasDuplicates =
                      filteredOrders.filter((i) => i.orderId === item.orderId).length > 1;
                    const idToDelete = hasDuplicates ? item.id : item.order.id;
                    hasDuplicates
                      ? handleDeleteOrderItem(idToDelete)
                      : handleDeleteOrder(idToDelete);
                  }}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CSVLink data={flattenedOrders} headers={headers} filename={'данные.csv'}>
        Экспорт в CSV
      </CSVLink>
    </Container>
  );
};

export default AdminOrder;
