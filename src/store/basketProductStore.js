import { makeAutoObservable } from 'mobx'

class BasketProductStore {
    _products = []

    constructor() {
        makeAutoObservable(this)
    }

    get products() {
        return this._products
    }

    get count() { // всего позиций в корзине
        return this._products.length 
    }

    set products(products) {
        this._products = products
    }
}

export default BasketProductStore