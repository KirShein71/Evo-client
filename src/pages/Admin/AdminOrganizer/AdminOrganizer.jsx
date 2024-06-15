import React from 'react';
import { getAllOrganizer, deleteOrganizer } from '../../../http/organizerApi';
import CreateOrganizer from './modals/CreateOrganizer';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import UpdateOrganizer from './modals/UpdateOrganizer';

const AdminOrganizer = () => {
  const [organizers, setOrganizers] = React.useState([]);
  const [organizerId, setOrganizerId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [createOrganizerModal, setCreateOrganizerModal] = React.useState(false);
  const [updateOrganizer, setUpdateOrganizer] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    getAllOrganizer()
      .then((data) => setOrganizers(data))
      .finally(() => setFetching(false));
  }, [change]);

  const handleUpdateOrganizer = (id) => {
    setOrganizerId(id);
    setUpdateOrganizer(true);
  };

  const handleDeleteOrganizer = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить органайзер?');
    if (confirmed) {
      deleteOrganizer(id)
        .then(() => {
          alert('Органайзер удален');
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
      <Button onClick={() => setCreateOrganizerModal(true)}>Создать карточку товара</Button>
      <CreateOrganizer
        show={createOrganizerModal}
        setShow={setCreateOrganizerModal}
        setChange={setChange}
      />
      <UpdateOrganizer
        show={updateOrganizer}
        setShow={setUpdateOrganizer}
        setChange={setChange}
        id={organizerId}
      />
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Размер</th>
              <th>Стоимость</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((organizer) => (
              <tr key={organizer.id}>
                <td>{organizer.size}</td>
                <td>{organizer.new_price}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleUpdateOrganizer(organizer.id)}>
                    Редактировать
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteOrganizer(organizer.id)}>
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

export default AdminOrganizer;
