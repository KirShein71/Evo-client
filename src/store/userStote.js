import { makeAutoObservable } from 'mobx'

class UserStore {
    id = null
    phone = null
    isAdmin = false
  

    constructor() {
        makeAutoObservable(this)
    }

    login({id, phone, role}) {
        this.id = id
        this.phone = phone
        this.isAdmin = role === 'ADMIN'
        
    }

    logout() {
        this.id = null
        this.phone = null
       
        this.isAdmin = false
    
    }
}

export default UserStore