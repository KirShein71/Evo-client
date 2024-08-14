import { guestInstance, authInstance } from './index'

export const getAllAnimal = async () => {
    const {data} = await guestInstance.get('animal/getall')
    return data
}


export const createAnimal = async (animal) => {
    const { data } = await authInstance.post('animal/create', animal)
    return data
}

export const createAnimalImage = async (animalimage) => {
    const { data } = await authInstance.post('animalimage/create', animalimage)
    return data
}

export const deleteAnimalImage = async (id) => {
    const { data } = await authInstance.delete(`animalimage/delete/${id}`)
    return data
}


export const getOneAnimal = async (id) => {
    const { data } = await guestInstance.get(`animal/getone/${id}`)
    return data
}

export const updateAnimal = async (id, animal) => {
    const { data } = await authInstance.put(`animal/update/${id}`, animal)
    return data
}

export const updatePrice = async (id, animal) => {
    const { data } = await authInstance.put(`animal/updatePrice/${id}`, animal)
    return data
}

export const deleteAnimal = async (id) => {
    const { data } = await authInstance.delete(`animal/delete/${id}`)
    return data
}