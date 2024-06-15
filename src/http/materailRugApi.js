import { guestInstance, authInstance } from './index'

export const getAllMaterialRug = async () => {
    const {data} = await guestInstance.get('material/getall')
    return data
}

export const getAllMaterialForAnimal = async () => {
    const { data} = await guestInstance.get('material/getAllMaterialForAnimal')
    return data
}

export const createMaterialRug = async (material) => {
    const { data } = await authInstance.post('material/create', material)
    return data
}

export const getOneMaterialRug = async (id) => {
    const { data } = await guestInstance.get(`material/getone/${id}`)
    return data
}


export const deleteMaterialRug = async (id) => {
    const { data } = await authInstance.delete(`material/delete/${id}`)
    return data
}