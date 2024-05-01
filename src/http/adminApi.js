import {  authInstance } from './index.js'
import {jwtDecode} from 'jwt-decode'

export const login = async (phone,password) => {
    try {
        const response = await authInstance.post('admin/login', {phone, password})
        const token = response.data.token
        const admin = jwtDecode(token)
        localStorage.setItem('token', token)
        localStorage.setItem('id', admin.id)
        return admin
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}


export const check = async () => {
    let adminToken, adminData
    try {
        adminToken = localStorage.getItem('token')
        // если в хранилище нет действительного токена
        if (!adminToken) {
            return false
        }
        // токен есть, надо проверить его подлинность
        const response = await authInstance.get('admin/check')
        adminToken = response.data.token
        adminData = jwtDecode(adminToken)
        localStorage.setItem('token', adminToken)
        return adminData
    } catch(e) {
        localStorage.removeItem('token')
        return false
    }
}


export const logout = () => {
    localStorage.removeItem('token')
}