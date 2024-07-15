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

  export const getRatesPvz = async (cityCode) => {
    try {
      const { data } = await guestInstance.post(`/cdek/getratespvz/${cityCode}`);
      return data;
    } catch (error) {
      console.error('Ошибка получения данных о тарифах:', error);
      throw error; 
    }
  };

  export const getRatesDelivery = async (cityCode) => {
    try {
      const { data } = await guestInstance.post(`/cdek/getratesdelivery/${cityCode}`);
      return data;
    } catch (error) {
      console.error('Ошибка получения данных о тарифах:', error);
      throw error; 
    }
  };


  export const createOrderCdek = async (name, surname, phone, codepvz, totalamount, citycode) => {
    const {data} = await guestInstance.post('cdek/createordercdek', {name, surname, phone, codepvz, totalamount, citycode})
    return data
    }

    export const createOrderCdekDelivery = async (name, surname, phone, totalamount, citycode, street, home, flat) => {
        const {data} = await guestInstance.post('cdek/createordercdekdelivery', {name, surname, phone, totalamount, citycode, street, home, flat})
        return data
        }

export const getOrderCdek = async () => {
    const {data} = await guestInstance.get('cdek/getordercdek')
    return data
}
    
    
