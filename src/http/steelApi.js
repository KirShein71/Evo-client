import { guestInstance, authInstance } from './index'

export const getAllSteel = async () => {
    const {data} = await guestInstance.get('steel/getall')
    return data
}


export const getOneSteel = async (id) => {
    const { data } = await guestInstance.get(`steel/getone/${id}`)
    return data
}

export const updateSteel = async (id, organizer) => {
    const { data } = await authInstance.put(`steel/update/${id}`, organizer)
    return data
}

export const updatePrice = async (id, organizer) => {
    const { data } = await authInstance.put(`steel/updatePrice/${id}`, organizer)
    return data
}

export const deleteSteel = async (id) => {
    const { data } = await authInstance.delete(`steel/delete/${id}`)
    return data
}