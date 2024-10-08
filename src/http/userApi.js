import {guestInstance, authInstance } from './index'
import {jwtDecode} from 'jwt-decode'

export const signup = async (phone, password) => {
    try {
        const response = await guestInstance.post('user/createAccount', {phone, password, role: 'USER'})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

    export const login = async (phone, password) => {
        try {
            const response = await authInstance.post('user/login', {phone, password})
            const token = response.data.token
            const user = jwtDecode(token)
            localStorage.setItem('token', token)
            localStorage.setItem('id', user.id)
            return user
        } catch (e) {
            alert(e.response.data.message)
            return false
        }
    }


    export const check = async () => {
        let userToken, userData
        try {
            userToken = localStorage.getItem('token')
            // если в хранилище нет действительного токена
            if (!userToken) {
                return false
            }
            // токен есть, надо проверить его подлинность
            const response = await authInstance.get('user/check')
            userToken = response.data.token
            userData = jwtDecode(userToken)
            localStorage.setItem('token', userToken)
            return userData
        } catch(e) {
            localStorage.removeItem('token')
            return false
        }
    }


    export const logout = () => {
        localStorage.removeItem('token')
    }
