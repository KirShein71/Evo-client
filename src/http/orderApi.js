import { guestInstance, authInstance } from './index'



export const getAllOrders = async () => {
    const { data } = await authInstance.get('order/getall')
    return data
}

export const getOne = async (id) => {
    const { data } = await authInstance.get(`order/getone/${id}`)
    return data
}

export const guestCreate = async (body) => {
    const { data } = await guestInstance.post('order/create', body)
    return data
}

export const updateStatus = async(id, order) => {
    const {data} = await guestInstance.put(`order/updateStatus/${id}`, order)
    return data
}

export const deleteOrder = async(id) => {
    const {data} = await guestInstance.delete(`order/delete/${id}`)
    return data
}