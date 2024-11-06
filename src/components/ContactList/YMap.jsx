import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function Ymap() {
  const mapState = { center: [59.912829, 30.340284], zoom: 16 };
  return (
    <YMaps>
      <Map defaultState={mapState} className="map">
        <Placemark
          geometry={{
            type: 'Point',
            coordinates: [59.912829, 30.340284],
          }}
          properties={{
            iconContent: 'Мы здесь',
          }}
        />
      </Map>
    </YMaps>
  );
}

export default Ymap;
