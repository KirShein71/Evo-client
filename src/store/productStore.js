import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    _carmodels = []
    _products = []
    _carmodel = null
   

    constructor() {
        makeAutoObservable(this)
    }
    get carmodels() {
        return this._carmodels
    }


    get products() {
        return this._products
    } 
 

    get carmodel() {
        return this._carmodel
    }


    set carmodels(carmodels) {
        this._carmodels = carmodels
    }

    set products(products) {
        this._products = products
    }


    set carmodel(id) {
        this._carmodel = id
    }

}