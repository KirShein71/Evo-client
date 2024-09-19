import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getOneFeedback, createNoteAdmin } from '../../../../http/feedback';

const defaultValue = { note_admin: '' };
const defaultValid = {
  note_admin: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'note_admin') result.note_admin = value.note_admin.trim() !== '';
  }
  return result;
};

const CreateNoteAdmin = (props) => {
  const { id, show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  React.useEffect(() => {
    if (id) {
      getOneFeedback(id)
        .then((data) => {
          const prod = {
            note_admin: data.note_admin !== null ? data.note_admin.toString() : '',
          };
          setValue(prod);
          setValid(isValid(prod));
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            console.log('An error occurred');
          }
        });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);
    if (correct.note_admin) {
      const data = new FormData();
      data.append('note_admin', value.note_admin.trim());

      createNoteAdmin(id, data)
        .then((data) => {
          const prod = {
            note: data.note_admin !== null ? data.note_admin.toString() : '',
          };
          setValue(prod);
          setValid(isValid(prod));
          setChange((state) => !state);
          setShow(false);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            console.log('An error occurred');
          }
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal__name">
      <Modal.Header closeButton>
        <Modal.Title>Добавить комментарий</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <textarea
                name="note_admin"
                value={value.note_admin}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.note_admin === true}
                isInvalid={valid.note_admin === false}
                placeholder="Комментарии"
                style={{ minHeight: '200px', width: '100%' }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNoteAdmin;
