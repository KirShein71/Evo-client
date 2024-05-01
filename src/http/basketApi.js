import { guestInstance } from './index.js'

export const fetchBasket = async () => {
    const { data } = await guestInstance.get('basket/getone')
    
    return data
}

export const append = async (productId, materialId, cellshapeId, edgingId, bodyId, trunkId, quantity, quantity_trunk) => {
    const { data } = await guestInstance.post(`basket/append`, {materialId, productId, cellshapeId, edgingId, bodyId, trunkId, quantity, quantity_trunk });
    return data;
}


export const getAllBasketProduct = async (basketId) => {
    const { data } = await guestInstance.get(`basketproduct/getall/${basketId}`)
    return data
}

export const deleteBasketProduct = async(id) => {
    const {data} = await guestInstance.delete(`basketproduct/delete/${id}`)
    return data
}