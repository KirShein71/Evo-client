import { guestInstance } from './index.js'

export const fetchBasket = async () => {
    const { data } = await guestInstance.get('basket/getone')
    
    return data
}

export const append = async (productId, materialId, edgingId, trunkId, thirdrowId, saddleId, steelId, quantity, quantity_trunk) => {
    const { data } = await guestInstance.post(`basket/append`, {materialId, productId, edgingId, trunkId, thirdrowId, saddleId, steelId, quantity, quantity_trunk});
    return data;
}

export const appendAnimal = async (animalId, materialId, quantity) => {
    const { data } = await guestInstance.post(`basket/appendAnimal`, { animalId, materialId, quantity  });
    return data;
}

export const appendHome = async (homeId, materialId, quantity) => {
    const { data } = await guestInstance.post(`basket/appendHome`, { homeId, materialId, quantity  });
    return data;
}

export const appendBag = async (bagId, bagmaterialId, bagsizeId, quantity) => {
    const { data } = await guestInstance.post(`basket/appendBag`, { bagId, bagmaterialId, bagsizeId, quantity});
    return data;
}

export const appendFavorite = async (productId) => {
    const { data } = await guestInstance.post(`basket/appendFavorite`, { productId  });
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

export const deleteTrunk = async (id) => {
    const { data } = await guestInstance.delete(`basketproduct/deleteTrunk/${id}`);
    return data;
};


export const deleteSteel = async (id) => {
    const { data } = await guestInstance.delete(`basketproduct/deleteSteel/${id}`);
    return data;
};

export const deleteSaddle = async (id) => {
    const { data } = await guestInstance.delete(`basketproduct/deleteSaddle/${id}`);
    return data;
};



