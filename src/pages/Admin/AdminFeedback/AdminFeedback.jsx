import React from 'react';
import { getAllFeedback } from '../../../http/feedback';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateNoteAdmin from './modals/createAdminNote';

const AdminFeedback = () => {
  const [feedbacks, setFeedbaks] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [createAdminNote, setCreateAdminNote] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [feedbackId, setFeedbackId] = React.useState(null);

  React.useEffect(() => {
    getAllFeedback()
      .then((data) => setFeedbaks(data))
      .finally(() => setFetching(false));
  }, [change]);

  const handleCreateAdminNote = (id) => {
    setFeedbackId(id);
    setCreateAdminNote(true);
  };

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Запросы от покупателей</h1>
      <div>
        <CreateNoteAdmin
          id={feedbackId}
          show={createAdminNote}
          setShow={setCreateAdminNote}
          setChange={setChange}
        />
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Комментарии</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks
              .sort((a, b) => a.id - b.id)
              .map((feedback) => (
                <tr key={feedback.id}>
                  <td>
                    {feedback.name
                      ? feedback.name
                      : `${feedback.brand.name} ${feedback.car_model.name}`}
                  </td>

                  <td>{feedback.phone}</td>
                  <td>
                    <div className="note">
                      <div className="note__content">
                        <p
                          className="note__field"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleCreateAdminNote(feedback.id)}>
                          {isExpanded
                            ? feedback.note_admin
                            : feedback.note_admin && feedback.note_admin.slice(0, 250)}
                        </p>
                        {feedback.note_admin && feedback.note_admin.length > 250 && (
                          <div className="note__show" onClick={handleToggleText}>
                            {isExpanded ? 'Скрыть' : 'Показать все...'}
                          </div>
                        )}
                      </div>
                      {feedback.note_admin === null ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button size="sm" onClick={() => handleCreateAdminNote(feedback.id)}>
                            Добавить
                          </Button>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminFeedback;
