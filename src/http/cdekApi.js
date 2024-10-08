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

  export const getRatesPackagePvz = async (cityCode) => {
    try {
      const { data } = await guestInstance.post(`/cdek/getratespackagepvz/${cityCode}`);
      return data;
    } catch (error) {
      console.error('Ошибка получения данных о тарифах:', error);
      throw error; 
    }
  };

  export const getRatesEconomPackagePvz = async (cityCode) => {
    try {
      const { data } = await guestInstance.post(`/cdek/getrateseconompackagepvz/${cityCode}`);
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

  export const getRatesEconomDelivery = async (cityCode) => {
    try {
      const { data } = await guestInstance.post(`/cdek/getrateseconomdelivery/${cityCode}`);
      return data;
    } catch (error) {
      console.error('Ошибка получения данных о тарифах:', error);
      throw error; 
    }
  };


  export const createOrderCdek = async (id, name, surname, phone, codepvz, totalamount, citycode, tariffcode) => {
    const {data} = await guestInstance.post('cdek/createordercdek', {id, name, surname, phone, codepvz, totalamount, citycode, tariffcode})
    return data
    }

    export const createOrderCdekDelivery = async (id, name, surname, phone, totalamount, citycode, street, home, flat, tariffcode) => {
        const {data} = await guestInstance.post('cdek/createordercdekdelivery', {id, name, surname, phone, totalamount, citycode, street, home, flat, tariffcode})
        return data
        }

export const getOrderCdek = async () => {
    const {data} = await guestInstance.get('cdek/getordercdek')
    return data
}
    
    
