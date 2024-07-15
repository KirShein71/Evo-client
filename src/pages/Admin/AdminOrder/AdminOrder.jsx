import React from 'react';
import { getAllOrders, deleteOrder } from '../../../http/orderApi';
import { createOrderCdek, createOrderCdekDelivery } from '../../../http/cdekApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateStatus from './modals/UpdateStatus';
import UpdateOrder from './modals/updateOrder';
import UpdatePhone from './modals/UpdatePhone';
import UpdateDelivery from './modals/UpdateDelivery';
import CreateOrder from './modals/CreateOrder';

import './style.scss';

const AdminOrder = () => {
  const [orders, setOrders] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [ordetId, setOrderId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const status = [{ name: 'Новый' }, { name: 'В работе' }, { name: 'Закрыт' }];
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const [orderItem, setOrderItem] = React.useState(null);
  const [updateOrderModal, setUpdateOrderModal] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
  const [openModalPhone, setOpenModalPhone] = React.useState(false);
  const [openModalDelivery, setOpenModalDelivery] = React.useState(false);
  const [openCreateOrder, setOpenCreateOrder] = React.useState(false);
  const [isButtonPvzDisabled, setIsButtonPvzDisabled] = React.useState(false);
  const [isButtonDeliveryDisabled, setIsButtonDeliveryDisabled] = React.useState(false);
  const modalRef = React.useRef();

  React.useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
        filterOrdersByStatus('Новый', data);
      })
      .finally(() => setFetching(false));
  }, [change]);

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

  const handleOrderRegistration = async (name, surname, phone, codepvz, totalamount, citycode) => {
    try {
      const response = await createOrderCdek(name, surname, phone, codepvz, totalamount, citycode);
      if (response && response.requests[0].state === 'ACCEPTED') {
        alert('Заказ успешно зарегистрован в Сдэк');
        setIsButtonPvzDisabled(true);
      } else {
        console.error('Ошибка регистрации заказа:', response);
      }
    } catch (error) {
      console.error('Ошибка регистрации заказа:', error);
    }
  };

  const handleOrderDeliveryRegistration = async (
    name,
    surname,
    phone,
    totalamount,
    citycode,
    street,
    home,
    flat,
  ) => {
    try {
      const response = await createOrderCdekDelivery(
        name,
        surname,
        phone,
        totalamount,
        citycode,
        street,
        home,
        flat,
      );
      if (response && response.requests[0].state === 'ACCEPTED') {
        alert('Заказ успешно зарегистрован в Сдэк');
        setIsButtonDeliveryDisabled(true);
      } else {
        console.error('Ошибка регистрации заказа:', response);
      }
    } catch (error) {
      console.error('Ошибка регистрации заказа:', error);
    }
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Все заказы</h1>
      <UpdateStatus id={ordetId} show={show} setShow={setShow} setChange={setChange} />
      <UpdatePhone
        id={ordetId}
        show={openModalPhone}
        setShow={setOpenModalPhone}
        setChange={setChange}
      />
      <UpdateDelivery
        id={ordetId}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.product && item.product.name
                  ? item.product.name
                  : item.trunk && item.trunk.product && item.trunk.product.name
                  ? item.trunk.product.name
                  : item.home && item.home.name
                  ? item.home.name
                  : item.animal && item.animal.name
                  ? item.animal.name
                  : ''}
              </td>
              <td
                style={{ cursor: 'pointer' }}
                onClick={() => handleUpdateOrder(item.id, item.productId)}>
                <ul>
                  <li>Материал: {item.material?.name}</li>
                  <li>{item.edging ? <span>Кант: {item.edging.name}</span> : null}</li>
                  <li>
                    Количество: {item.quantity} шт {item.thirdrow ? '3 ряда' : ''}
                  </li>
                  <li>{item.trunk ? <span>Багажник: {item.quantity_trunk} шт</span> : null}</li>
                  <li>
                    {item.steel ? <span>{item.steel.name}</span> : null}{' '}
                    {item.saddle ? <span>{item.saddle.name}</span> : null}
                  </li>
                  <li>
                    {item.organizer ? (
                      <span>Органайзер 40см: {item.quantity_organizer}</span>
                    ) : null}
                  </li>
                  <li>
                    {item.organizerfifty ? (
                      <span>Органайзер 50см: {item.quantity_organizerfifty}</span>
                    ) : null}
                  </li>
                  <li>Полная стоимость заказа (без доставки): {item.order.totalamount}</li>
                </ul>
              </td>
              <td>{item.prettyCreatedAt}</td>
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
                    <Button
                      variant="primary"
                      disabled={isButtonPvzDisabled}
                      onClick={() =>
                        handleOrderRegistration(
                          item.order.name,
                          item.order.surname,
                          item.order.phone,
                          item.order.codepvz,
                          item.order.totalamount,
                          item.order.citycode,
                        )
                      }>
                      Зарегистрировать заказ
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={isButtonDeliveryDisabled}
                      onClick={() =>
                        handleOrderDeliveryRegistration(
                          item.order.name,
                          item.order.surname,
                          item.order.phone,
                          item.order.totalamount,
                          item.order.citycode,
                          item.order.street,
                          item.order.home,
                          item.order.flat,
                        )
                      }>
                      Зарегистрировать заказ с доставкой
                    </Button>
                  )}
                </td>
              ) : (
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUpdateDelivery(item.order.id)}>
                  <div>
                    {item.order.delivery === 1
                      ? 'Самовывоз'
                      : item.order.delivery === 3
                      ? 'Почта'
                      : ''}
                  </div>
                  <div>
                    {item.order.city}
                    <div>{item.order.region}</div>
                  </div>
                </td>
              )}

              <td>
                <Button onClick={() => handleDeleteOrder(item.order.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrder;
