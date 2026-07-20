const API_BASE = import.meta.env.VITE_API_BASE
import axios from 'axios'

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export async function apiFetch(path, options ={}) {
    try {
        const response = await api({
            url: path,
            method: options.method || 'GET',
            data: options.body ? JSON.parse(options.body) : undefined,
            ...options,
            headers: {...options.headers}
        })
        return response.data
    } catch (err) {
        if (err.response) {
            const errorText = typeof err.response.data === 'object'
                ? JSON.stringify(err.response.data)
                : err.response.data
            throw new Error(errorText, { cause: err })
        }
        throw err
    }
}