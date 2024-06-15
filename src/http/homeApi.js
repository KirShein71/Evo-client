import { guestInstance, authInstance } from './index'

export const getAllHome = async () => {
    const {data} = await guestInstance.get('home/getall')
    return data
}


export const createHome = async (home) => {
    const { data } = await authInstance.post('home/create', home)
    return data
}


export const getOneHome = async (id) => {
    const { data } = await guestInstance.get(`home/getone/${id}`)
    return data
}

export const updateHome = async (id, home) => {
    const { data } = await authInstance.put(`home/update/${id}`, home)
    return data
}

export const updatePrice = async (id, home) => {
    const { data } = await authInstance.put(`home/updatePrice/${id}`, home)
    return data
}

export const deleteHome = async (id) => {
    const { data } = await authInstance.delete(`home/delete/${id}`)
    return data
}