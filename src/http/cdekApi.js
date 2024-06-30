import { guestInstance} from './index'

export const getAllRegions = async () => {
    const {data} = await guestInstance.get('cdek/getregions')
    return data
}

export const getAllCities = async (regionCode) => {
    try {
        const {data} = await guestInstance.get(`cdek/getcities/${regionCode}`)
    return data
    } catch (error) {
        console.error('Ошибка получения данных о пвз:', error);
      throw error;
    }
    
}

export const getAllOffices = async (cityCode) => {
    try {
      const { data } = await guestInstance.get(`/cdek/getoffices/${cityCode}`);
      return data;
    } catch (error) {
      console.error('Ошибка получения данных о пвз:', error);
      throw error; 
    }
  };

  export const getRates = async (cityCode) => {
    try {
      const { data } = await guestInstance.post(`/cdek/getrates/${cityCode}`);
      return data;
    } catch (error) {
      console.error('Ошибка получения данных о тарифах:', error);
      throw error; 
    }
  };


  export const createOrderCdek = async () => {
    const {data} = await guestInstance.post('cdek/createordercdek')
    return data
}
