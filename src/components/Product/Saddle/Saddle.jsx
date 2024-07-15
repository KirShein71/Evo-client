import React from 'react';
import { getAllSaddle } from '../../../http/saddleApi';
import { getAllSteel } from '../../../http/steelApi';
import './style.scss';

function Saddle({ setSelectedSaddle, setSelectedSteel }) {
  const [saddles, setSaddles] = React.useState([]);
  const [steels, setSteels] = React.useState([]);
  const [steelChecked, setSteelChecked] = React.useState(false);
  const [saddleChecked, setSaddleChecked] = React.useState(false);

  React.useEffect(() => {
    getAllSaddle().then((data) => setSaddles(data));
    getAllSteel().then((data) => setSteels(data));
  }, []);

  const handleSaddleChange = (saddleId) => {
    setSaddleChecked((prev) => !prev);
    if (saddleChecked) {
      setSelectedSaddle(null);
    } else {
      setSelectedSaddle(saddleId);
    }
  };

  const handleSteelChange = (steelId) => {
    setSteelChecked((prev) => !prev);
    if (steelChecked) {
      setSelectedSteel(null);
    } else {
      setSteelChecked(steelId);
    }
  };

  return (
    <div className="saddle">
      <div className="saddle__content">
        {saddles.map((saddle) => (
          <div key={saddle.id}>
            <div className="saddle__card">
              <div className="checkbox">
                <div class="cntr">
                  <label for="cbxSaddle" class="label-cbx">
                    <input
                      id="cbxSaddle"
                      type="checkbox"
                      class="invisible"
                      checked={saddleChecked}
                      onChange={() => {
                        handleSaddleChange(saddle.id);
                      }}
                    />
                    <div class="checkbox">
                      <svg width="20px" height="20px" viewBox="0 0 20 20">
                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                        <polyline points="4 11 8 15 16 6"></polyline>
                      </svg>
                    </div>
                  </label>
                </div>
              </div>
              <div className="saddle__card-image">
                <img src={process.env.REACT_APP_IMG_URL + saddle.image} alt="saddle" />
              </div>
              <div className="saddle__card-name">{saddle.name}</div>
              <div className="saddle__card-price">{saddle.new_price} P</div>
            </div>
          </div>
        ))}
        {steels.map((steel) => (
          <div key={steel.id}>
            <div className="saddle__card">
              <div className="checkbox">
                <div class="cntr">
                  <label for="cbxSteel" class="label-cbx">
                    <input
                      id="cbxSteel"
                      type="checkbox"
                      class="invisible"
                      checked={steelChecked}
                      onChange={() => {
                        handleSteelChange(steel.id);
                      }}
                    />
                    <div class="checkbox">
                      <svg width="20px" height="20px" viewBox="0 0 20 20">
                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                        <polyline points="4 11 8 15 16 6"></polyline>
                      </svg>
                    </div>
                  </label>
                </div>
              </div>
              <div className="saddle__card-image">
                <img src={process.env.REACT_APP_IMG_URL + steel.image} alt="saddle" />
              </div>
              <div className="saddle__card-name">{steel.name}</div>
              <div className="saddle__card-price">{steel.new_price} P</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saddle;
