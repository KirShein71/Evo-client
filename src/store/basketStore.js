import { makeAutoObservable } from 'mobx'

class BasketProductStore {
    _basketproducts = []

    _id = null

    constructor() {
        makeAutoObservable(this)
    }

    get basketproducts() {
        return this._basketproducts
    }

    get id() {
        return this._id
    }

    get count() { // всего позиций в корзине
        return this._basketproducts.length 
    }


    set basketproducts(basketproducts) {
        this._basketproducts = basketproducts
    }

    
}

export default BasketProductStore