import React from 'react';
import { getAllEdging, deleteEdging } from '../../../http/edgingApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateEdging from './modals/CreateEdging';

const AdminEdging = () => {
  const [edgings, setEdgings] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [createShow, setCreateShow] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    const fetchEdgings = async () => {
      try {
        const data = await getAllEdging();
        setEdgings(data);
      } catch (error) {
        console.error('Ошибка при загрузке окантовок:', error);
        alert('Не удалось загрузить окантовки. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchEdgings();
  }, [change]);

  const handleDeleteClick = (id) => {
    deleteEdging(id)
      .then((data) => {
        setChange(!change);
        alert(`Цвет материала «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Цвет канта</h1>
      <Button onClick={() => setCreateShow(true)}>Создать цвет канта</Button>
      <CreateEdging show={createShow} setShow={setCreateShow} setChange={setChange} />
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Цвет</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {edgings.map((edging) => (
              <tr key={edging.id}>
                <td>{edging.color}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(edging.id)}>
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

export default AdminEdging;
