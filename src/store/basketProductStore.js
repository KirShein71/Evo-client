import { makeAutoObservable } from 'mobx'

class BasketProductStore {
    _products = []

    constructor() {
        makeAutoObservable(this)
    }

    get products() {
        console.log(this._products)
        return this._products
    }

    get count() {
    
        return this._products.length; 
    }

    set products(products) {
        this._products = products
    }

   
}

export default BasketProductStore