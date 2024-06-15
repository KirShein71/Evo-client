import React from 'react';
import { getAllOrganizer } from '../../../http/organizerApi';
import './style.scss';

function Organizer({ selectedOrganizer, setSelectedOrganizer }) {
  const [organizers, setOrganizers] = React.useState([]);

  React.useEffect(() => {
    getAllOrganizer().then((data) => setOrganizers(data));
  }, []);

  const handleOrganizerChange = (id) => {
    if (selectedOrganizer === id) {
      setSelectedOrganizer(null); // Снимаем выбор, если чекбокс уже был выбран
    } else {
      setSelectedOrganizer(id); // Выбираем чекбокс
    }
  };

  return (
    <div className="organizer">
      <div className="organizer__title">Не забудьте добавить органайзер</div>
      <div className="organizer__content">
        <div className="organizer__card">
          <div className="organizer__image">
            <img src="../img/organizer.jpg" alt="organizer" />
          </div>
          {organizers.map((organizer) => (
            <div key={organizer.id}>
              <div className="checkbox" style={{ display: 'flex' }}>
                <div class="cntr">
                  <label for={organizer.id} class="label-cbx">
                    <input
                      id={organizer.id}
                      type="checkbox"
                      class="invisible"
                      checked={selectedOrganizer === organizer.id}
                      onChange={() => {
                        handleOrganizerChange(organizer.id);
                      }}
                    />
                    <div class="checkbox">
                      <svg width="20px" height="20px" viewBox="0 0 20 20">
                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                        <polyline points="4 11 8 15 16 6"></polyline>
                      </svg>
                    </div>
                  </label>
                </div>{' '}
                <div className="organizer__checkbox">
                  <span>{organizer.size} см</span>
                  <p>{organizer.new_price} Р</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Organizer;
