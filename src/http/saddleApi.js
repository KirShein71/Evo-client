import { guestInstance, authInstance } from './index'

export const getAllSaddle = async () => {
    const {data} = await guestInstance.get('saddle/getall')
    return data
}


export const createSaddle = async (saddle) => {
    const { data } = await authInstance.post('saddle/create', saddle)
    return data
}


export const getOneSaddle = async (id) => {
    const { data } = await guestInstance.get(`saddle/getone/${id}`)
    return data
}

export const updateSaddle = async (id, saddle) => {
    const { data } = await authInstance.put(`saddle/update/${id}`, saddle)
    return data
}

export const updatePrice = async (id, saddle) => {
    const { data } = await authInstance.put(`saddle/updatePrice/${id}`, saddle)
    return data
}

export const deleteSaddle = async (id) => {
    const { data } = await authInstance.delete(`saddle/delete/${id}`)
    return data
}