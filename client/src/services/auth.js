import axios from "axios";

const api = axios.create({
    baseURL: "localhost:3001"
})

export const login = async (credentials) => {
    const res = await api.post('/login', credentials)
    console.log(res.data)
    return res.data
}


export const register = async (credentials) => {
    const res = await api.post('/register', credentials)
    console.log(res.data)
    return res.data
}

export const verify = async () => {
    const res = await api.get('/verify')
    console.log(res.data)
    return res.data
}