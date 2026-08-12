import { apiFetch} from "./client";
import axios from "axios";

export function getMe() {
    return apiFetch('/auth/me')
}

export function login(credentials) {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    })
}

export function logout() {
    return apiFetch('/auth/logout', {method: 'POST'})
}

export function register(credentials) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials)
    })
}

export function editSelf(newUser) {
    return apiFetch('/auth/me/edit', {
        method: 'POST',
        body: JSON.stringify(newUser)
    })
}

export function getUser(userId) {
    return apiFetch(`/auth/getuser/${userId}`)
}

export async function uploadAvatar(formData) {
    const endpoint = 'https://localhost:5000/uploadavatar'
    try {
        const response = await axios.post(endpoint, formData)
        return response.data
    } catch (err) {
        if (err.response) {
            const errorText = typeof err.response.data === 'object'
                ? JSON.stringify(err.response.data)
                : err.response.data
            throw new Error(errorText, {cause: err})
        }
        throw err
    }
}