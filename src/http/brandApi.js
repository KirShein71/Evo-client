import { guestInstance, authInstance } from './index'

export const getAllBrand = async () => {
    const {data} = await guestInstance.get('brand/getall')
    return data
}

export const createBrand = async (brand) => {
    const { data } = await authInstance.post('brand/create', brand)
    return data
}

export const getOneBrand = async (name) => {
    const { data } = await guestInstance.get(`brand/getone/${name}`)
    return data
}

export const updateBrand = async (id, brand) => {
    const { data } = await authInstance.put(`brand/update/${id}`, brand)
    return data
}

export const deleteBrand = async (id) => {
    const { data } = await authInstance.delete(`brand/delete/${id}`)
    return data
}