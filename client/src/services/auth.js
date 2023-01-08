import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001"
})

export const login = async (credentials) => {
    try {
        const res = await api.post('/login', credentials)
        const token = res.data.token
        if(token){
            localStorage.setItem('token', token)
            return res.data
        }
        console.error('Cannot Authenticate')
        return null
    } catch (e) {  
        console.error(e.response.data)
        return null 
    }
}


export const register = async (credentials) => {
    try {
        const res = await api.post('/register', credentials)
        const token = res.data.token
        if(token){
            localStorage.setItem('token', token)
            return res.data
        }
        console.error('Cannot Authenticate')
        return null
    } catch (e) {
        console.error(e.response.data)
        return null 
    }
}

export const verify = async () => {
    try {
        const token = localStorage.getItem('token')
        if(token){
            const header = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await api.get('/verify', header)
            if(res){
                console.log(res)
            }
            return res.data
        }
    } catch (e) {
        console.error(e.response.data)
        return null
    }
}