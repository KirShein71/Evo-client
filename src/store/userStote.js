import { makeAutoObservable } from 'mobx'

class UserStore {
    id = null
    phone = null
    isAdmin = false
    isUser = false
  

    constructor() {
        makeAutoObservable(this)
    }

    login({id, phone, role}) {
        this.id = id
        this.phone = phone
        this.isAdmin = role === 'ADMIN'
        this.isUser = role === 'USER'
        
    }

    logout() {
        this.id = null
        this.phone = null
        this.isUser = false
        this.isAdmin = false
    
    }
}

export default UserStore