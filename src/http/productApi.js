import { guestInstance, authInstance } from './index'

export const getAllProduct = async () => {
    const {data} = await guestInstance.get('product/getall')
    return data
}

export const getAllProductByBrandId = async (brandId) => {
    const { data } = await guestInstance.get(`product/getall/${brandId}`);
    return data;
}

export const getSaleProduct = async () => {
    const { data} = await guestInstance.get('product/getSaleProduct')
    return data
}

export const createProduct = async (product) => {
    const { data } = await authInstance.post('product/create', product)
    return data
}

export const createSale = async (id, product) => {
    const { data} = await guestInstance.put(`product/createSale/${id}`, product)
    return data
}

export const deleteSaleProduct = async (id) => {
    const {data} = await guestInstance.delete(`product/deleteSaleProduct/${id}`)
    return data
}

export const getOneProduct = async (id) => {
    const { data } = await guestInstance.get(`product/getone/${id}`)
    return data
}

export const updateProduct = async (id, product) => {
    const { data } = await authInstance.put(`product/update/${id}`, product)
    return data
}

export const updatePrice = async (id, product) => {
    const { data } = await authInstance.put(`product/updatePrice/${id}`, product)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await authInstance.delete(`product/delete/${id}`)
    return data
}