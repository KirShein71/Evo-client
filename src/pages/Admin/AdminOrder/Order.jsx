import React from 'react';
import { getOne } from '../../../http/orderApi';
import { Table, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getOne(id)
      .then((data) => setOrder(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <>
        <ul>
          <li>Дата заказа: {order.prettyCreatedAt}</li>
        </ul>
        <ul>
          <li>Имя, фамилия: {order.name}</li>
          <li>Номер телефона: {order.phone}</li>
        </ul>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Форма ячейки</th>
              <th>Цвет материала</th>
              <th>Цвет канта</th>
              <th>Кузов</th>
              <th>Количество(салон)</th>
              <th>Коврик в багажник</th>
              <th>Количество(багажник)</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items &&
              order.order_items.length > 0 &&
              order.order_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.productId === null ? item.trunk.product.name : item.product?.name}</td>
                  <td>{item.cellshape.name === 'sota' ? 'Сота' : 'Ромб'}</td>
                  <td>{item.material?.name}</td>
                  <td>{item.edging?.name}</td>
                  <td>{item.body?.name}</td>
                  <td>{item.productId === null ? '' : item.quantity}</td>
                  <td>{item.trunkId === null ? 'Нет' : 'Да'}</td>
                  <td>{item.trunkId === null ? '' : item.quantity_trunk}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default Order;
