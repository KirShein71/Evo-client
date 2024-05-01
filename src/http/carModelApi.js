import { guestInstance, authInstance } from './index'

export const getAllCarModel = async () => {
    const {data} = await guestInstance.get('carmodel/getall')
    return data
}

export const getAllCarModelByBrandId = async (brandId) => {
    const { data } = await guestInstance.get(`carmodel/getall/${brandId}`);
    return data;
}

export const createCarModel = async (carmodel) => {
    const { data } = await authInstance.post('carmodel/create', carmodel)
    return data
}

export const getOneCarModel = async (id) => {
    const { data } = await guestInstance.get(`carmodel/getone/${id}`)
    return data
}

export const updateCarModel = async (id, carmodel) => {
    const { data } = await authInstance.put(`carmodel/update/${id}`, carmodel)
    return data
}

export const deleteCarModel = async (id) => {
    const { data } = await authInstance.delete(`carmodel/delete/${id}`)
    return data
}