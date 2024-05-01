import { guestInstance, authInstance } from './index'

export const getAllEdging = async () => {
    const {data} = await guestInstance.get('edging/getall')
    return data
}

export const createEdging = async (edging) => {
    const { data } = await authInstance.post('edging/create', edging)
    return data
}

export const getOneEdging = async (id) => {
    const { data } = await guestInstance.get(`edging/getone/${id}`)
    return data
}


export const deleteEdging = async (id) => {
    const { data } = await authInstance.delete(`edging/delete/${id}`)
    return data
}