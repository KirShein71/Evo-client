import { guestInstance, authInstance } from './index'



export const getAllOrders = async () => {
    const { data } = await authInstance.get('order/getall')
    return data
}

export const getOne = async (id) => {
    const { data } = await authInstance.get(`order/getone/${id}`)
    return data
}

export const getOneOrderItem = async (id) => {
    const { data } = await authInstance.get(`order/getOneOrderItem/${id}`)
    return data
}

export const guestCreate = async (body) => {
    const { data } = await guestInstance.post('order/create', body)
    return data
}

export const adminCreate = async (order) => {
    const { data } = await guestInstance.post('order/createAdmin', order)
    return data
}

export const updateStatus = async(id, order) => {
    const {data} = await guestInstance.put(`order/updateStatus/${id}`, order)
    return data
}

export const createNote = async(id, order) => {
    const {data} = await guestInstance.put(`order/createNote/${id}`, order)
    return data
}

export const updateOrder = async(id, order) => {
    const {data} = await guestInstance.put(`order/updateOrder/${id}`, order)
    return data
}

export const updatePhone = async(id, order) => {
    const {data} = await guestInstance.put(`order/updatePhone/${id}`, order)
    return data
}

export const updateDelivery = async(id, order) => {
    const {data} = await guestInstance.put(`order/updateDelivery/${id}`, order)
    return data
}

export const deleteOrder = async(id) => {
    const {data} = await guestInstance.delete(`order/deleteOrder/${id}`)
    return data
}

export const deleteOrderItem = async(id) => {
    const {data} = await guestInstance.delete(`order/deleteOrderItem/${id}`)
    return data
}