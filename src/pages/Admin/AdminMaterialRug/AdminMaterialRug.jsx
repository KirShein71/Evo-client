import React from 'react';
import { getAllMaterialRug, deleteMaterialRug } from '../../../http/materailRugApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateMaterialRug from './modals/CreateMaterialRug';

const AdminMaterialRug = () => {
  const [materials, setMaterials] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [createShow, setCreateShow] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await getAllMaterialRug();
        setMaterials(data);
      } catch (error) {
        console.error('Ошибка при загрузке материалов:', error);
        alert('Не удалось загрузить материалы. Пожалуйста, попробуйте позже.');
      } finally {
        setFetching(false);
      }
    };

    fetchMaterials();
  }, [change]);

  const handleDeleteClick = (id) => {
    deleteMaterialRug(id)
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
      <h1>Цвет материала</h1>
      <Button onClick={() => setCreateShow(true)}>Создать цвет материала</Button>
      <CreateMaterialRug show={createShow} setShow={setCreateShow} setChange={setChange} />
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Цвет</th>
              <th>Форма ячейки</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>{material.color}</td>
                <td>{material.cellshape.name}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(material.id)}>
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

export default AdminMaterialRug;
