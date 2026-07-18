import { apiFetch} from "./client";

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