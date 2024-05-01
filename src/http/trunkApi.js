import { guestInstance, authInstance } from './index'

export const getAllProductTrunk = async () => {
    const {data} = await guestInstance.get('trunk/getall')
    return data
}

export const getAllProductId = async (productId) => {
    const { data } = await guestInstance.get(`trunk/getall/${productId}`);
    return data;
}

export const createProductTrunk = async (producttrunk) => {
    const { data } = await authInstance.post('trunk/create', producttrunk)
    return data
}

export const getOneProductTrunk = async (id) => {
    const { data } = await guestInstance.get(`trunk/getone/${id}`)
    return data
}

export const updateProductTrunk = async (id, producttrunk) => {
    const { data } = await authInstance.put(`trunk/update/${id}`, producttrunk)
    return data
}

export const deleteProductTrunk = async (id) => {
    const { data } = await authInstance.delete(`trunk/delete/${id}`)
    return data
}