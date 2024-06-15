import axios from 'axios';
import jwtDecode from 'jwt-decode';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.cdek.ru/v2/calculator/tariff';

export const getAllRegion = async () => {
  const account = 'Dqsnv0ptuXpDUzOYxGgCn3f9cA2cQLW9';
  const password = 'bYaN281Li7jbNuMUKpk23eXzyxctb2p';

  try {
    const response = await axios.post(proxyUrl + apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${account}:${password}`)}`,
      },
    });

    const token = response.data.token;

    if (!token) {
      throw new Error('Token not found in response');
    }

    const region = jwtDecode(token);
    localStorage.setItem('token', token); 

    return region;
  } catch (error) {
    console.error('Error fetching data:', error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }

    return false;
  }
};




