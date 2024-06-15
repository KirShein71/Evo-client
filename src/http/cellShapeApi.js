import { guestInstance } from './index'

export const getAllCellShape = async () => {
    const {data} = await guestInstance.get('cellshape/getall')
    return data
}

export const getOneCellShape = async (id) => {
    const { data } = await guestInstance.get(`cellshape/getone/${id}`)
    return data
}