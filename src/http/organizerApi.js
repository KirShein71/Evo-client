import { guestInstance, authInstance } from './index'

export const getAllOrganizer = async () => {
    const {data} = await guestInstance.get('organizer/getall')
    return data
}


export const createOrganizer = async (organizer) => {
    const { data } = await authInstance.post('organizer/create', organizer)
    return data
}


export const getOneOrganizer = async (id) => {
    const { data } = await guestInstance.get(`organizer/getone/${id}`)
    return data
}

export const updateOrganizer = async (id, organizer) => {
    const { data } = await authInstance.put(`organizer/update/${id}`, organizer)
    return data
}

export const updatePrice = async (id, organizer) => {
    const { data } = await authInstance.put(`organizer/updatePrice/${id}`, organizer)
    return data
}

export const deleteOrganizer = async (id) => {
    const { data } = await authInstance.delete(`organizer/delete/${id}`)
    return data
}