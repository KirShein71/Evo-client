import React from 'react';
import axios from 'axios';

function Cdek() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [regions, setRegions] = React.useState([]);

  React.useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(
          'https://api.edu.cdek.ru/v2/oauth/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI',
            client_secret: 'PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        setAccessToken(response.data.access_token);
        console.log(response.data.access_token);
      } catch (error) {
        console.error('Ошибка получения токена доступа:', error);
      }
    };

    fetchAccessToken();
  }, []);

  React.useEffect(() => {
    const fetchRegions = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get('https://api.edu.cdek.ru/v2/location/regions', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRegions(response.data);
      } catch (error) {
        console.error('Ошибка получения данных о регионах:', error);
      }
    };

    fetchRegions();
  }, [accessToken]);
}

export default Cdek;
