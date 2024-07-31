import { makeAutoObservable } from 'mobx';


    class FavoriteProductStore {
        _items = []
        constructor() {
            makeAutoObservable(this);
        }
        get items() {
            return this._items;
        }
        set items(items) {
            this._items = items;
        }
    
        get count() {
            return this._items.length;
        }

        addToFavorites(productId) {
            this.items.push(productId);
          }
        
        removeFromFavorites(productId) {
            this.items = this.items.filter((item) => item !== productId);
          }
    }
    
    export default FavoriteProductStore;