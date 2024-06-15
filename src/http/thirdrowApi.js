import { guestInstance, authInstance } from './index'

export const getAllProductThirdrow = async () => {
    const {data} = await guestInstance.get('thirdrow/getall')
    return data
}

export const getAllProductIdThirdrow = async (productId) => {
    const { data } = await guestInstance.get(`thirdrow/getall/${productId}`);
    return data;
}

export const createProductThirdrow = async (productthirdrow) => {
    const { data } = await authInstance.post('thirdrow/create', productthirdrow)
    return data
}

export const getOneProductThirdrow = async (id) => {
    const { data } = await guestInstance.get(`thirdrow/getone/${id}`)
    return data
}

export const updateProductThirdrow = async (id, productthirdrow) => {
    const { data } = await authInstance.put(`thirdrow/update/${id}`, productthirdrow)
    return data
}

export const deleteProductThirdrow = async (id) => {
    const { data } = await authInstance.delete(`thirdrow/delete/${id}`)
    return data
}