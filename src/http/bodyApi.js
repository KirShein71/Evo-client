import { guestInstance } from './index'

export const getAllBody = async () => {
    const {data} = await guestInstance.get('body/getall')
    return data
}

export const getOneBody = async (id) => {
    const { data } = await guestInstance.get(`body/getone/${id}`)
    return data
}