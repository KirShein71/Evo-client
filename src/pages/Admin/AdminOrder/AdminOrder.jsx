import React from 'react';
import { getAllOrders, deleteOrder } from '../../../http/orderApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateStatus from './modals/UpdateStatus';
import { Link } from 'react-router-dom';

import './style.scss';

const AdminOrder = () => {
  const [orders, setOrders] = React.useState();
  const [fetching, setFetching] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [ordetId, setOrderId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const status = [{ name: 'Новый' }, { name: 'В работе' }, { name: 'Закрыт' }];
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [filteredOrders, setFilteredOrders] = React.useState([]);

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

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Все заказы</h1>
      <UpdateStatus id={ordetId} show={show} setShow={setShow} setChange={setChange} />
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
            <th>Дата</th>
            <th>Покупатель</th>
            <th>Телефон</th>
            <th>Статус</th>
            <th>Подробнее</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.prettyCreatedAt}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
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
                <Link to={`/order/${item.id}`}>Подробнее</Link>
              </td>
              <td>
                <Button onClick={() => handleDeleteOrder(item.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrder;
