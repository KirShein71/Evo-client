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
        console.log('Количество товаров в корзине:', this._products.length); // Логируем значение
        return this._products.length; 
    }

    set products(products) {
        this._products = products
    }

   
}

export default BasketProductStore