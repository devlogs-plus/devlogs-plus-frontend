import { apiFetch} from "./client";

export function getMe() {
    return apiFetch('http://127.0.0.1:5000/auth/me')
}

export function login(credentials) {
    return apiFetch('/auth/login', {
        methods: 'POST',
        body: JSON.stringify(credentials)
    })
}

export function logout() {
    return apiFetch('/auth/logout', {method: 'POST'})
}