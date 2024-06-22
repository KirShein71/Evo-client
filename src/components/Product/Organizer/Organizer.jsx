import React from 'react';
import { getAllOrganizer, getAllOrganizerFifty } from '../../../http/organizerApi';
import './style.scss';

function Organizer({
  setSelectedOrganizerFifty,
  setSelectedOrganizer,
  organizerQuantity,
  setOrganizerQuantity,
  isCountOrganizerDisabled,
  organizerFiftyQuantity,
  setOrganizerFiftyQuantity,
  isCountOrganizerFiftyDisabled,
}) {
  const [organizers, setOrganizers] = React.useState([]);
  const [organizersFifty, setOrganizersFifty] = React.useState([]);
  const [organizerChecked, setOrganizerChecked] = React.useState(false);
  const [organizerFiftyChecked, setOrganizerFiftyChecked] = React.useState(false);

  React.useEffect(() => {
    getAllOrganizer().then((data) => setOrganizers(data));
    getAllOrganizerFifty().then((data) => setOrganizersFifty(data));
  }, []);

  const handleOrganizerChange = (organizerId) => {
    setOrganizerChecked(!organizerChecked);
    setSelectedOrganizer(organizerId);
  };

  const handleOrganizerFiftyChange = (organizerFiftyId) => {
    setOrganizerFiftyChecked(!organizerFiftyChecked);
    setSelectedOrganizerFifty(organizerFiftyId);
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
            <>
              <div key={organizer.id}>
                <div className="checkbox" style={{ display: 'flex' }}>
                  <div class="cntr">
                    <label for="cbxOrganizer" class="label-cbx">
                      <input
                        id="cbxOrganizer"
                        type="checkbox"
                        class="invisible"
                        checked={organizerChecked}
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
                    <p>{organizer.new_price * organizerQuantity} Р</p>
                  </div>
                </div>
              </div>
              {organizerChecked && (
                <div className="organizer-equipment__quantity">
                  <button
                    className="organizer-equipment__minus"
                    onClick={() => setOrganizerQuantity(organizerQuantity - 1)}
                    disabled={isCountOrganizerDisabled}>
                    <img src="../img/minus.png" alt="minus" />
                  </button>
                  <div className="organizer-equipment__total">{organizerQuantity}</div>
                  <button className="organizer-equipment__plus">
                    <img
                      src="../img/plus.png"
                      alt="plus"
                      onClick={() => setOrganizerQuantity(organizerQuantity + 1)}
                    />
                  </button>
                </div>
              )}
            </>
          ))}
          {organizersFifty.map((organizerFifty) => (
            <>
              <div key={organizerFifty.id}>
                <div className="checkbox" style={{ display: 'flex' }}>
                  <div class="cntr">
                    <label for="cbxOrganizerFifty" class="label-cbx">
                      <input
                        id="cbxOrganizerFifty"
                        type="checkbox"
                        class="invisible"
                        checked={organizerFiftyChecked}
                        onChange={() => {
                          handleOrganizerFiftyChange(organizerFifty.id);
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
                    <span>{organizerFifty.size} см</span>
                    <p>{organizerFifty.new_price * organizerFiftyQuantity} Р</p>
                  </div>
                </div>
              </div>
              {organizerFiftyChecked && (
                <div className="organizer-equipment__quantity">
                  <button
                    className="organizer-equipment__minus"
                    onClick={() => setOrganizerFiftyQuantity(organizerFiftyQuantity - 1)}
                    disabled={isCountOrganizerFiftyDisabled}>
                    <img src="../img/minus.png" alt="minus" />
                  </button>
                  <div className="organizer-equipment__total">{organizerFiftyQuantity}</div>
                  <button className="organizer-equipment__plus">
                    <img
                      src="../img/plus.png"
                      alt="plus"
                      onClick={() => setOrganizerFiftyQuantity(organizerFiftyQuantity + 1)}
                    />
                  </button>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Organizer;
