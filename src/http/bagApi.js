import { guestInstance, authInstance } from './index'

export const getAllBag = async () => {
    const {data} = await guestInstance.get('bag/getall')
    return data
}


export const createBag = async (bag) => {
    const { data } = await authInstance.post('bag/create', bag)
    return data
}

export const createBagImage = async (bagimage) => {
    const { data } = await authInstance.post('bagimage/create', bagimage)
    return data
}

export const deleteBagImage = async (id) => {
    const { data } = await authInstance.delete(`bagimage/delete/${id}`)
    return data
}

export const createBagPicture = async (bagpicture) => {
    const { data } = await authInstance.post('bagpicture/create', bagpicture)
    return data
}

export const deleteBagPicture = async (id) => {
    const { data } = await authInstance.delete(`bagpicture/delete/${id}`)
    return data
}


export const getOneBag = async (originalName) => {
    const { data } = await guestInstance.get(`bag/getone/${originalName}`)
    return data
}

export const updateBag = async (id, bag) => {
    const { data } = await authInstance.put(`bag/update/${id}`, bag)
    return data
}

export const updatePrice = async (id, bag) => {
    const { data } = await authInstance.put(`bag/updatePrice/${id}`, bag)
    return data
}

export const deleteBag = async (id) => {
    const { data } = await authInstance.delete(`bag/delete/${id}`)
    return data
}

export const getAllBagSize = async () => {
    const {data} = await guestInstance.get('bag/getAllBagSize')
    return data
}

export const getAllBagMaterial = async () => {
    const { data} = await guestInstance.get('bag/getAllBagMaterial')
    return data
}


