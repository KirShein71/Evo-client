import React from 'react';
import { getAllOrders, deleteOrder, deleteOrderItem } from '../../../http/orderApi';
import { createOrderCdek, createOrderCdekDelivery } from '../../../http/cdekApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateStatus from './modals/UpdateStatus';
import UpdateOrder from './modals/updateOrder';
import UpdatePhone from './modals/UpdatePhone';
import UpdateDelivery from './modals/UpdateDelivery';
import CreateNote from './modals/createNote';
import CreateOrderBag from './modals/CreateOrderBag';
import CreateAutoRug from './modals/CreateAutoRug';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

import './style.scss';
import UpdateName from './modals/UpdateName';

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
  const [setIsButtonPvzDisabled] = React.useState(false);
  const [setTextButton] = React.useState('Зарегистрировать заказ');
  const [modalCreateNote, setModalCreateNote] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [disabledOrderIds, setDisabledOrderIds] = React.useState([]);
  const [openModalCreateBag, setOpenModalCreateBag] = React.useState(false);
  const [openModalAutoRug, setOpenModalAutoRug] = React.useState(false);
  const [openModalUpdateName, setOpenModalUpdateName] = React.useState(false);

  const modalRef = React.useRef();

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        filterOrdersByStatus(selectedStatus, data);

        // Получаем отключенные заказы из localStorage
        const disabledOrders = data.filter((order) => {
          const storedState = localStorage.getItem(`order-${order.id}`);
          return storedState === 'disabled';
        });

        // Обновляем состояние с отключенными id
        setDisabledOrderIds(disabledOrders.map((order) => order.id));
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        alert('Не удалось загрузить заказы. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchOrders();
  }, [change, selectedStatus]);

  const filterOrdersByStatus = (status, ordersData) => {
    if (status === 'Все') {
      setFilteredOrders(ordersData);
    } else {
      const filtered = ordersData?.filter((order) => order.status === status);
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

  const handleCreateBag = (id) => {
    setOrderId(id);
    setOpenModalCreateBag(true);
  };

  const handleCreateAutoRug = (id) => {
    setOrderId(id);
    setOpenModalAutoRug(true);
  };

  const handleUpdateName = (id) => {
    setOrderId(id);
    setOpenModalUpdateName(true);
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

  const handleDeleteOrderItem = (id) => {
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
    total,
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
        total,
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
    total,
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
        total,
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
    { label: 'Подпятник алюминевый', key: 'steel' },
    { label: 'Подпятник Стальной', key: 'saddle' },
    { label: 'Багажник', key: 'trunk' },
    { label: 'Кол Багажник', key: 'quantity_trunk' },
    { label: 'Коврик 3 ряда', key: 'thirdrow' },
    { label: 'Кол 3 ряда', key: 'quantity_thirdrow' },
  ];

  const flattenedOrders = orders
    .filter((item) => item.status === 'Новый')
    .flatMap((item) => {
      return item.order_items.map((orderItems) => ({
        id: item.id,
        name:
          orderItems.product?.name ||
          orderItems.animal?.name ||
          orderItems.home?.name ||
          orderItems.bag?.name ||
          '',
        material: orderItems.material?.name || '',
        bagmaterial: orderItems.bagmaterial?.name || '',
        bagsize: orderItems.bagsize?.size || '',
        edging: orderItems.edging && orderItems.edging.name ? orderItems.edging.name : '',
        quantity: orderItems.quantity,
        steel: orderItems.steel ? 'Да' : 'Нет',
        saddle: orderItems.saddle ? 'Да' : 'Нет',
        trunk: orderItems.trunk ? 'Да' : 'Нет',
        quantity_trunk: orderItems.trunk ? orderItems.quantity_trunk : 0,
        thirdrow: orderItems.thirdrow ? 'Да' : 'Нет',
        quantity_thirdrow: orderItems.thirdrow ? orderItems.quantity : '',
      }));
    });

  console.log(flattenedOrders);

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

      <CreateOrderBag
        orderId={orderId}
        show={openModalCreateBag}
        setShow={setOpenModalCreateBag}
        setChange={setChange}
      />
      <CreateAutoRug
        orderId={orderId}
        show={openModalAutoRug}
        setShow={setOpenModalAutoRug}
        setChange={setChange}
      />
      <UpdateName
        id={orderId}
        show={openModalUpdateName}
        setShow={setOpenModalUpdateName}
        setChange={setChange}
      />
      <Link to="/adminorder/createorder">
        <Button variant="primary">Создать заказ</Button>
      </Link>
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
            <th>Описание</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Покупатель</th>
            <th>Доставка</th>
            <th>Комментарии</th>
            <th>Личный кабинет</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.order_items.map((orderItems) => {
                  const productName =
                    orderItems.product?.name ||
                    orderItems.trunk?.product?.name ||
                    orderItems.home?.name ||
                    orderItems.animal?.name ||
                    orderItems.bag?.name ||
                    '';

                  const linkTo =
                    orderItems.product && orderItems.product.name
                      ? `/productproperty/${orderItems.product.name
                          .replace(/-+/g, '--')
                          .replace(/s+/g, '-')}`
                      : orderItems.trunk && orderItems.trunk.product.name
                      ? `/productproperty/${orderItems.trunk.product.name
                          .replace(/-+/g, '--')
                          .replace(/s+/g, '-')}`
                      : orderItems.home && orderItems.home.name
                      ? '/homeproduct'
                      : orderItems.bag && orderItems.bag.name
                      ? `/organizer/${orderItems.bag.name.replace(/-+/g, '--').replace(/s+/g, '-')}`
                      : '';

                  return (
                    <Table>
                      <thead>
                        <tr>
                          <Link to={linkTo} key={orderItems.id}>
                            <th>{productName}</th>
                          </Link>
                        </tr>
                      </thead>
                      <td style={{ cursor: 'pointer' }}>
                        <>
                          <Table>
                            <tbody>
                              <tr>
                                <td>
                                  <div key={orderItems.id}>
                                    <ul>
                                      <li>
                                        Материал: {orderItems.material?.name} ||{' '}
                                        {orderItems.bagmaterial?.name}
                                      </li>
                                      {orderItems.bag !== null ? (
                                        <li>Размер: {orderItems.bagsize?.size}</li>
                                      ) : (
                                        ''
                                      )}
                                      <li>
                                        {orderItems.edging ? (
                                          <span>Кант: {orderItems.edging.name}</span>
                                        ) : null}
                                      </li>
                                      {orderItems.bag === null ? (
                                        <li>
                                          Количество: {orderItems.quantity} шт{' '}
                                          {orderItems.thirdrow ? '3 ряда' : ''}
                                        </li>
                                      ) : (
                                        <li>Количество: {orderItems.quantity} шт </li>
                                      )}
                                      <li>
                                        {orderItems.trunk ? (
                                          <span>Багажник: {orderItems.quantity_trunk} шт</span>
                                        ) : null}
                                      </li>
                                      <li>
                                        {orderItems.steel ? (
                                          <span>{orderItems.steel.name}</span>
                                        ) : null}{' '}
                                        {orderItems.saddle ? (
                                          <span>{orderItems.saddle.name}</span>
                                        ) : null}
                                      </li>
                                    </ul>
                                    <div style={{ marginBottom: '10px' }}>
                                      Стоимость:
                                      {(orderItems.product
                                        ? orderItems.product.new_price * orderItems.quantity
                                        : 0) +
                                        (orderItems.home
                                          ? orderItems.home.new_price * orderItems.quantity
                                          : 0) +
                                        (orderItems.bagsize
                                          ? orderItems.bagsize.price * orderItems.quantity
                                          : 0) +
                                        (orderItems.steel ? orderItems.steel.new_price : 0) +
                                        (orderItems.saddle ? orderItems.saddle.new_price : 0) +
                                        (orderItems.thirdrow
                                          ? orderItems.thirdrow.new_price * orderItems.quantity
                                          : 0) +
                                        (orderItems.trunk
                                          ? orderItems.trunk.new_price * orderItems.quantity_trunk
                                          : 0)}
                                    </div>
                                  </div>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="me-3"
                                    onClick={() => handleDeleteOrderItem(orderItems.id)}>
                                    Удалить
                                  </Button>
                                  {orderItems.bag === null ? (
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleUpdateOrder(orderItems.id, orderItems.productId)
                                      }>
                                      Редактировать
                                    </Button>
                                  ) : (
                                    ''
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </>
                      </td>
                    </Table>
                  );
                })}
                <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex' }}>
                  <Button size="sm" className="me-3" onClick={() => handleCreateBag(item.id)}>
                    Добавить органайзер
                  </Button>
                  <Button size="sm" onClick={() => handleCreateAutoRug(item.id)}>
                    Добавить автоковрик
                  </Button>
                </div>
                <div>
                  Полная стоимость заказа (без доставки):
                  {item.total}
                </div>

                <div>Стоимость доставки: {Number(item.deliverysum) + 100};</div>
              </td>

              <td>{item.prettyCreatedAt}</td>
              <td
                style={{
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor:
                    item.status === 'Новый'
                      ? 'red'
                      : item.status === 'В работе'
                      ? 'green'
                      : 'black',
                }}
                onClick={() => handleUpdateStatus(item.id)}>
                {item.status}
              </td>
              <td>
                <div
                  style={{ cursor: 'pointer', marginBottom: '10px' }}
                  onClick={() => handleUpdateName(item.id)}>
                  {item.name} {item.surname}
                </div>

                <div style={{ cursor: 'pointer' }} onClick={() => handleUpdatePhone(item.id)}>
                  {item.phone}
                </div>
              </td>
              {item.delivery === 2 ? (
                <td>
                  {item.codepvz !== null ? (
                    <>
                      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
                        СДЭК
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        Доставка в пункт выдачи сдэк
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        {' '}
                        Населенный пунк: {item.location}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '400' }}>
                        Код пвз: {item.codepvz}
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <Button
                          className="mt-3 mb-3"
                          variant="primary"
                          disabled={disabledOrderIds.includes(item.id)}
                          onClick={() =>
                            handleOrderRegistration(
                              item.id,
                              item.name,
                              item.surname,
                              item.phone,
                              item.codepvz,
                              item.total,
                              item.citycode,
                              item.tariffcode,
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
                        {item.location}, улица: {item.street}, дом: {item.home}, кв: {item.flat}
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
                              item.name,
                              item.surname,
                              item.phone,
                              item.total,
                              item.citycode,
                              item.street,
                              item.home,
                              item.flat,
                              item.tariffcode,
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
                <td style={{ cursor: 'pointer' }}>
                  <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
                    {item.delivery === 1 ? 'Самовывоз' : item.delivery === 3 ? 'Почта России' : ''}
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: '400' }}>
                    Индекс пвз: {item.city}
                    <div style={{ fontSize: '17px', fontWeight: '400' }}>
                      Адрес пвз: {item.region}
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
                      onClick={() => handleOpenModalCreateNote(item.id)}>
                      {isExpanded ? item.note : item.note && item.note.slice(0, 250)}
                    </p>
                    {item.note && item.note.length > 250 && (
                      <div className="note__show" onClick={handleToggleText}>
                        {isExpanded ? 'Скрыть' : 'Показать все...'}
                      </div>
                    )}
                  </div>
                  {item.note === null ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button size="sm" onClick={() => handleOpenModalCreateNote(item.id)}>
                        Добавить
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </td>
              <td>{item.userId !== null ? 'Есть' : 'Нет'}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteOrder(item.id)}>
                  Удалить заказ полность
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
