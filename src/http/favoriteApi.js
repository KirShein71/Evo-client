import { guestInstance } from './index.js'

export const getAllFavoriteProduct= async (basketId) => {
    const { data } = await guestInstance.get(`favorite/getall/${basketId}`)
    return data
}

export const deleteFavoriteProduct = async(productId) => {
    const {data} = await guestInstance.delete(`favorite/delete/${productId}`)
    return data
}