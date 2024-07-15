import { guestInstance } from './index.js'

export const fetchBasket = async () => {
    const { data } = await guestInstance.get('basket/getone')
    
    return data
}

export const append = async (productId, materialId, edgingId, trunkId, thirdrowId, saddleId, steelId, organizerId, organizerfiftyId, quantity, quantity_trunk, quantity_organizer, quantity_organizerfifty) => {
    const { data } = await guestInstance.post(`basket/append`, {materialId, productId, edgingId, trunkId, thirdrowId, saddleId, steelId, organizerId, organizerfiftyId, quantity, quantity_trunk, quantity_organizer, quantity_organizerfifty});
    return data;
}

export const appendAnimal = async (animalId, materialId, edgingId, quantity) => {
    const { data } = await guestInstance.post(`basket/appendAnimal`, { animalId, materialId, edgingId, quantity  });
    return data;
}

export const appendHome = async (homeId, materialId, edgingId, quantity) => {
    const { data } = await guestInstance.post(`basket/appendHome`, { homeId, materialId, edgingId, quantity  });
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